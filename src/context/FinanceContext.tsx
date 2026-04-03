import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserRole, FilterOptions, DashboardStats } from '../types/finance';
import { generateMockTransactions } from '../utils/mockData';
import { loadTransactions, saveTransactions, loadUserRole, saveUserRole } from '../utils/localStorage';

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  filters: FilterOptions;
  stats: DashboardStats;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setUserRole: (role: UserRole) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = loadTransactions();
    return saved || generateMockTransactions();
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => loadUserRole());

  const [filters, setFiltersState] = useState<FilterOptions>({
    searchTerm: '',
    typeFilter: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveUserRole(userRole);
  }, [userRole]);

  const stats: DashboardStats = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    totalBalance: 0
  };
  stats.totalBalance = stats.totalIncome - stats.totalExpenses;

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}`
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const setFilters = (newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        userRole,
        filters,
        stats,
        addTransaction,
        setUserRole,
        setFilters
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
