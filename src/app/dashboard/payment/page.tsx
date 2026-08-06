// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import { getPayments } from "@/services/payment";
// import { Payment } from "@/app/types/payment";
// import SummaryCards from "@/components/dashboard/SummaryCards";
// import PaymentFilters from "@/components/dashboard/PaymentFilters";
// import PaymentsTable from "@/components/dashboard/PaymentsTable";

// export default function PaymentPage() {
//   const [filters, setFilters] = useState({
//     search: "",
//     month: "",
//     year: "",
//     paymentType: "",
//     from: "",
//     to: "",
//   });

//   const [payments, setPayments] = useState<Payment[]>([]);

//   const [summary, setSummary] = useState({
//     totalAmount: 0,
//     totalFine: 0,
//     totalCollection: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);

//       const res = await getPayments(filters);

//       setPayments(res.data.payments);

//       setSummary(res.data.summary);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, [filters]);

//   const handleChange = (name: string, value: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       search: "",
//       month: "",
//       year: "",
//       paymentType: "",
//       from: "",
//       to: "",
//     });
//   };

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 20,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       transition={{
//         duration: 0.4,
//       }}
//       className="space-y-8"
//     >
//       <div>
//         <h1 className="text-4xl font-bold text-brand-green">Payments</h1>

//         <p className="text-gray-500 mt-2">
//           View and manage all member payments.
//         </p>
//       </div>

//       <SummaryCards summary={summary} totalPayments={payments.length} />

//       <PaymentFilters
//         filters={filters}
//         onChange={handleChange}
//         onReset={resetFilters}
//       />

//       <PaymentsTable payments={payments} loading={loading} />
//     </motion.div>
//   );
// }
