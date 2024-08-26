import create from 'zustand';

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  phone: string;
  date: string;
  status: string;
  category: string;
  subcategory: string;
}

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
}));

export default useTransactionStore;