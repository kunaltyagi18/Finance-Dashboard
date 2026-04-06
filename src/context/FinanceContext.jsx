import { createContext, useContext, useState, useEffect } from 'react';
import { generateMockTransactions } from '../utils/mockData';
import { loadTransactions, saveTransactions, loadUserRole, saveUserRole } from '../utils/localStorage';

// Create the context
const FinanceContext = createContext(undefined);

// Provider component — wraps whole app and holds global state
export const FinanceProvider = ({ children }) => {
  // Load transactions from localStorage, or generate mock data if none saved
  const [transactions, setTransactions] = useState(() => {
    const saved = loadTransactions();
    return saved || generateMockTransactions();
  });

  // Load role from localStorage
  const [userRole, setUserRoleState] = useState(() => loadUserRole());

  // Filter/sort state
  const [filters, setFiltersState] = useState({
    searchTerm: '',
    typeFilter: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  // Save transactions whenever they change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Save role whenever it changes
  useEffect(() => {
    saveUserRole(userRole);
  }, [userRole]);

  // Compute stats from transactions
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `txn-${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Update role
  const setUserRole = (role) => {
    setUserRoleState(role);
  };

  // Merge new filters with existing
  const setFilters = (newFilters) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
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
        setFilters,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook to use context easily
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};