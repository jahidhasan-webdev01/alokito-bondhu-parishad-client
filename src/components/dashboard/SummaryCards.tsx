"use client";

import { motion } from "framer-motion";
import { DollarSign, Receipt, AlertCircle, Wallet } from "lucide-react";

interface Props {
  summary?: {
    totalAmount: number;
    totalFine: number;
    totalCollection: number;
  };

  totalPayments?: number;
}

export default function SummaryCards({ summary, totalPayments = 0 }: Props) {
  const cards = [
    {
      title: "Total Collection",
      value: summary?.totalCollection ?? 0,
      icon: Wallet,
      bg: "bg-brand-green",
    },
    {
      title: "Total Share",
      value: summary?.totalAmount ?? 0,
      icon: DollarSign,
      bg: "bg-brand-blue",
    },
    {
      title: "Total Fine",
      value: summary?.totalFine ?? 0,
      icon: AlertCircle,
      bg: "bg-brand-gold",
    },
    {
      title: "Payments",
      value: totalPayments,
      icon: Receipt,
      bg: "bg-emerald-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
            }}
            className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        hover:shadow-xl
                        "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-brand-green">
                  {typeof card.value === "number"
                    ? card.title === "Payments"
                      ? card.value
                      : `৳${card.value.toLocaleString()}`
                    : card.value}
                </h2>
              </div>

              <div
                className={`
                                ${card.bg}
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-xl
                                text-white
                                `}
              >
                <Icon size={28} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
