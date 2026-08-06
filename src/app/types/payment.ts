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

  paymentType:
    | "BKASH"
    | "NAGAD"
    | "ROCKET"
    | "BANK_DEPOSIT"
    | "BANK_TRANSFER"
    | "CASH";

  paidDate: string;
}

export interface PaymentSummary {
  totalAmount: number;
  totalFine: number;
  totalCollection: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaymentResponse {
  payments: Payment[];
  pagination: Pagination;
  summary: PaymentSummary;
}