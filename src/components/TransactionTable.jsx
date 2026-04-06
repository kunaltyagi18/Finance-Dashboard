import { useMemo, useState } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import AddTransactionModal from './AddTransactionModal';

const TransactionTable = () => {
  const { transactions, filters, setFilters, userRole } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply search, filter, and sort to transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search by category or description
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term)
      );
    }

    // Filter by type
    if (filters.typeFilter !== 'all') {
      result = result.filter((t) => t.type === filters.typeFilter);
    }

    // Sort
    result.sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') {
        return multiplier * (new Date(a.date) - new Date(b.date));
      } else {
        return multiplier * (a.amount - b.amount);
      }
    });

    return result;
  }, [transactions, filters]);

  // Toggle sort when clicking column header
  const handleSort = (field) => {
    if (filters.sortBy === field) {
      setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: field, sortOrder: 'desc' });
    }
  };

  // Icon to show current sort state
  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return <ArrowUpDown className="w-4 h-4" />;
    return filters.sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        {/* Only admin sees the Add Transaction button */}
        {userRole === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by category or description..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ searchTerm: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type filter buttons */}
          <div className="flex gap-2">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ typeFilter: type })}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filters.typeFilter === type
                    ? type === 'income'
                      ? 'bg-green-600 text-white'
                      : type === 'expense'
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  onClick={() => handleSort('date')}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    Date
                    <SortIcon field="date" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th
                  onClick={() => handleSort('amount')}
                  className="px-4 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center justify-end gap-2">
                    Amount
                    <SortIcon field="amount" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTransactions.length > 0 ? (
                filteredAndSortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-semibold text-right ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedTransactions.length} of {transactions.length} transactions
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <AddTransactionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TransactionTable;