"use client";

import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";

interface Props {
  filters: {
    search: string;
    month: string;
    year: string;
    paymentType: string;
    from: string;
    to: string;
  };

  onChange: (name: string, value: string) => void;

  onReset: () => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const paymentTypes = [
  "CASH",
  "BKASH",
  "NAGAD",
  "ROCKET",
  "BANK_DEPOSIT",
  "BANK_TRANSFER",
];

const years = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export default function PaymentFilters({ filters, onChange, onReset }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
      className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            "
    >
      <div className="grid gap-5 lg:grid-cols-3 xl:grid-cols-6">
        {/* Search */}

        <div className="relative xl:col-span-2">
          <Search
            size={18}
            className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        "
          />

          <input
            type="text"
            placeholder="Search member..."
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            className="
                        input
                        w-full
                        rounded-xl
                        border-gray-300
                        bg-brand-cream
                        pl-11
                        focus:border-brand-green
                        "
          />
        </div>

        {/* Month */}

        <select
          className="
                    select
                    w-full
                    rounded-xl
                    border-gray-300
                    bg-brand-cream
                    "
          value={filters.month}
          onChange={(e) => onChange("month", e.target.value)}
        >
          <option value="">Month</option>

          {months.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        {/* Year */}

        <select
          className="
                    select
                    w-full
                    rounded-xl
                    border-gray-300
                    bg-brand-cream
                    "
          value={filters.year}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value="">Year</option>

          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Payment Type */}

        <select
          className="
                    select
                    w-full
                    rounded-xl
                    border-gray-300
                    bg-brand-cream
                    "
          value={filters.paymentType}
          onChange={(e) => onChange("paymentType", e.target.value)}
        >
          <option value="">Payment Type</option>

          {paymentTypes.map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* Reset */}

        <button
          onClick={onReset}
          className="
                    btn
                    rounded-xl
                    border-none
                    bg-brand-green
                    text-white
                    hover:bg-brand-green-light
                    "
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Date Filter */}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            From Date
          </label>

          <input
            type="date"
            className="
                        input
                        w-full
                        rounded-xl
                        border-gray-300
                        bg-brand-cream
                        "
            value={filters.from}
            onChange={(e) => onChange("from", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            To Date
          </label>

          <input
            type="date"
            className="
                        input
                        w-full
                        rounded-xl
                        border-gray-300
                        bg-brand-cream
                        "
            value={filters.to}
            onChange={(e) => onChange("to", e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
}
