"use client";

import { motion } from "framer-motion";
import { CalendarDays, CreditCard, Eye, User } from "lucide-react";

export interface Payment {
  id: string;
  transactionId: string;

  memberId: string;
  memberName: string;
  mobile: string;

  month: number;
  year: number;

  amount: number;
  fine: number;
  total: number;

  paymentType: string;

  paidDate: string;
}

interface Props {
  payments: Payment[];

  loading?: boolean;

  onView?: (payment: Payment) => void;
}

const paymentBadge: Record<string, string> = {
  CASH: "badge-success",

  BKASH: "badge-info",

  NAGAD: "badge-warning",

  ROCKET: "badge-secondary",

  BANK_DEPOSIT: "badge-primary",

  BANK_TRANSFER: "badge-accent",
};

export default function PaymentsTable({
  payments,
  loading = false,
  onView,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-10 text-center">
        <span className="loading loading-spinner loading-lg text-brand-green"></span>
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-16 text-center">
        <CreditCard size={60} className="mx-auto text-brand-green" />

        <h2 className="mt-5 text-2xl font-bold">No Payments Found</h2>

        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
            "
    >
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-brand-green text-white">
            <tr>
              <th>Member</th>

              <th>Transaction</th>

              <th>Month</th>

              <th>Amount</th>

              <th>Fine</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Date</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                whileHover={{
                  backgroundColor: "#fffcf5",
                }}
                className="border-b"
              >
                {/* Member */}

                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-brand-green
                                            text-white
                                            "
                    >
                      <User size={22} />
                    </div>

                    <div>
                      <p className="font-semibold">{payment.memberName}</p>

                      <p className="text-sm text-gray-500">
                        {payment.memberId}
                      </p>

                      <p className="text-xs text-gray-400">{payment.mobile}</p>
                    </div>
                  </div>
                </td>

                {/* Transaction */}

                <td>
                  <span className="font-medium">{payment.transactionId}</span>
                </td>

                {/* Month */}

                <td>
                  {payment.month}/{payment.year}
                </td>

                {/* Amount */}

                <td className="font-semibold">
                  ৳{payment.amount.toLocaleString()}
                </td>

                {/* Fine */}

                <td>
                  {payment.fine > 0 ? (
                    <span className="badge badge-error">৳{payment.fine}</span>
                  ) : (
                    <span className="badge badge-success">None</span>
                  )}
                </td>

                {/* Total */}

                <td>
                  <span className="font-bold text-brand-green">
                    ৳{payment.total.toLocaleString()}
                  </span>
                </td>

                {/* Payment */}

                <td>
                  <span
                    className={`badge ${paymentBadge[payment.paymentType]}`}
                  >
                    {payment.paymentType.replace("_", " ")}
                  </span>
                </td>

                {/* Date */}

                <td>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    {new Date(payment.paidDate).toLocaleDateString()}
                  </div>
                </td>

                {/* Action */}

                <td>
                  <button
                    className="
                                        btn
                                        btn-sm
                                        bg-brand-green
                                        hover:bg-brand-green-light
                                        text-white
                                        border-none
                                        "
                    onClick={() => onView?.(payment)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
