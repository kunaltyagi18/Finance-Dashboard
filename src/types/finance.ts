export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export type UserRole = 'viewer' | 'admin';

export interface FilterOptions {
  searchTerm: string;
  typeFilter: 'all' | 'income' | 'expense';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}
