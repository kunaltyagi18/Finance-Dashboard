import { Transaction, UserRole } from '../types/finance';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-dashboard-transactions',
  USER_ROLE: 'finance-dashboard-role'
};

export const loadTransactions = (): Transaction[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions:', error);
  }
};

export const loadUserRole = (): UserRole => {
  try {
    const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return (role as UserRole) || 'viewer';
  } catch {
    return 'viewer';
  }
};

export const saveUserRole = (role: UserRole): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (error) {
    console.error('Failed to save user role:', error);
  }
};
