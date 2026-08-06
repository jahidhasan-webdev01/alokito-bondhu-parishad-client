"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, UserRound, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DateInputOnChange } from "@/components/ui/date";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MONTHLY_AMOUNT = 1000;
const LATE_FEE = 100;

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const paymentTypes = [
  { label: "Cash", value: "CASH" },
  { label: "Bkash", value: "BKASH" },
  { label: "Nagad", value: "NAGAD" },
  { label: "Rocket", value: "ROCKET" },
  { label: "Bank Deposit", value: "BANK_DEPOSIT" },
  { label: "Bank Transfer", value: "BANK_TRANSFER" },
];

export default function AddPaymentPage() {
  const router = useRouter();

  // State Management
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [transactionId, setTransactionId] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [paymentType, setPaymentType] = useState("CASH");
  const [isLate, setIsLate] = useState(false);

  // Computed Values
  const totalAmount = MONTHLY_AMOUNT + (isLate ? LATE_FEE : 0);

  // 1. Fetch Members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          credentials: "include",
        });
        const result = await res.json();
        setMembers(result.data || []);
        setFilteredMembers(result.data || []);
      } catch (error) {
        toast.error("Failed to load members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // console.log("members", members);

  // 2. Filter Members Search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredMembers(members);
      return;
    }

    const value = search.toLowerCase();
    const result = members.filter(
      (member) =>
        member.memberId?.toLowerCase().includes(value) ||
        member.fullName?.toLowerCase().includes(value) ||
        member.mobile?.includes(value),
    );

    setFilteredMembers(result);
  }, [search, members]);

  // 3. Auto-detect Late Payment (after day 10)
  useEffect(() => {
    if (paymentDate) {
      const day = Number(paymentDate.split("-")[2]);

      setIsLate(day > 10);
    }
  }, [paymentDate]);

  // 4. Form Submission
  const handleSubmit = async () => {
    if (!selected) return toast.error("Please select a member");
    if (!transactionId.trim()) return toast.error("Transaction ID is required");
    if (!month) return toast.error("Month is required");
    if (!year) return toast.error("Year is required");
    if (!paymentDate) return toast.error("Payment date is required");
    if (!paymentType) return toast.error("Payment type is required");

    try {
      setSubmitting(true);

      const payload = {
        memberId: selected.memberId,
        transactionId: transactionId.trim(),
        month,
        year,
        paidDate: paymentDate,
        paymentType,
        isLate,
        amount: totalAmount,
      };

      const res = await fetch(`${API_URL}/payments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Payment submission failed");
      }

      toast.success("Payment recorded successfully");
      router.push("/dashboard/payments");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl space-y-8 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-brand-green">Add Payment</h1>
        <p className="mt-2 text-gray-500">
          Record monthly member contribution.
        </p>
      </div>

      {/* Member Selection Section */}
      <section className="border-b border-brand-gold/30 pb-8">
        <h2
          className="
        mb-5
        text-xl
        font-semibold
        text-brand-green
    "
        >
          Select Member
        </h2>

        <div
          className="
        flex
        items-center
        gap-3
        border-b
        border-brand-gold/30
        pb-3
    "
        >
          <Search size={20} className="text-brand-green" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by member ID, name, or mobile"
            className="
                w-full
                bg-transparent
                outline-none
            "
          />
        </div>

        {/* Member List Container */}

        <div
          className="
            mt-5
            max-h-[420px]
            overflow-y-auto
            pr-2
            space-y-3
            scrollbar-thin
        "
        >
          {loading ? (
            <p className="text-gray-500">Loading members...</p>
          ) : filteredMembers.length === 0 ? (
            <p className="text-gray-500">No members found.</p>
          ) : (
            filteredMembers.map((member, index) => (
              <motion.button
                key={member.memberId}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="button"
                onClick={() => setSelected(member)}
                className={`
                        w-full
                        flex
                        items-center
                        gap-4
                        rounded-xl
                        border
                        p-4
                        text-left
                        transition

                        ${
                          selected?.memberId === member.memberId
                            ? "border-brand-green bg-brand-green/5"
                            : "border-brand-gold/30 hover:border-brand-green/50"
                        }
                    `}
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-green/10">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.fullName}
                      width={80}
                      height={80}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-green/10">
                      <UserRound className="h-10 w-10 text-brand-green" />
                    </div>
                  )}
                </div>

                <div>
                  <h3
                    className="
                            font-semibold
                            text-brand-green
                        "
                  >
                    {member.fullName}
                  </h3>

                  <p className="text-sm text-gray-500">{member.memberId}</p>

                  <p className="text-sm text-gray-500">{member.mobile}</p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </section>

      {/* Payment Details Section */}
      <AnimatePresence>
        {selected && (
          <motion.section
            initial={{
              opacity: 0,
              y: 30,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -20,
              height: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="space-y-6 border-b border-brand-gold/30 pb-8"
          >
            <h2 className="text-xl font-semibold text-brand-green">
              Payment Information
            </h2>

            <div className="grid gap-5 md:grid-cols-4">
              <Input
                label="Transaction ID"
                value={transactionId}
                onChange={(e: any) => setTransactionId(e.target.value)}
                placeholder="e.g. TXN123456"
              />

              <Select
                label="Month"
                value={month}
                onChange={(e: any) => setMonth(Number(e.target.value))}
                options={months}
              />

              <Input
                label="Year"
                type="number"
                value={year}
                onChange={(e: any) => setYear(Number(e.target.value))}
              />

              <DateInputOnChange
                label="Payment Date"
                name="paymentDate"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Select
                label="Payment Type"
                value={paymentType}
                onChange={(e: any) => setPaymentType(e.target.value)}
                options={paymentTypes}
              />

              <Input
                label="Monthly Amount"
                value={`৳ ${MONTHLY_AMOUNT}`}
                readOnly
              />

              <Input
                label="Total Payable"
                value={`৳ ${totalAmount}`}
                readOnly
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-brand-gold/30 p-5">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="lateFeeCheck"
                  checked={isLate}
                  onChange={(e) => setIsLate(e.target.checked)}
                  className="h-5 w-5 accent-brand-green cursor-pointer"
                />
                <label
                  htmlFor="lateFeeCheck"
                  className="text-sm font-medium text-brand-green cursor-pointer select-none"
                >
                  Late Payment Fee (+৳{LATE_FEE})
                </label>
              </div>

              <div className="flex items-center gap-4">
                <Wallet className="text-brand-green" />
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <h3 className="text-xl font-bold text-brand-green">
                    ৳ {selected.totalBalance ?? 0}
                  </h3>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || !selected}
          className="rounded-lg bg-brand-green px-8 py-3 font-semibold text-white transition disabled:opacity-50 hover:bg-brand-green/90"
        >
          {submitting ? "Saving..." : "Save Payment"}
        </button>
      </div>
    </motion.div>
  );
}

/* Helper Form Components */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-green">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-brand-gold/30 bg-transparent px-4 py-3 outline-none focus:border-brand-green transition"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-green">
        {label}
      </label>
      <select
        {...props}
        className="w-full border border-brand-gold/30 bg-transparent px-4 py-3 outline-none focus:border-brand-green transition"
      >
        {options.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
