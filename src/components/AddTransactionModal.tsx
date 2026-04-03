import { X } from 'lucide-react';
import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

interface AddTransactionModalProps {
  onClose: () => void;
}

export const AddTransactionModal = ({ onClose }: AddTransactionModalProps) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
    description: ''
  });

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Bonus', 'Other'],
    expense: [
      'Groceries',
      'Rent',
      'Utilities',
      'Entertainment',
      'Transportation',
      'Healthcare',
      'Shopping',
      'Dining',
      'Other'
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;

    addTransaction({
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      description: formData.description || `${formData.category} transaction`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Add Transaction</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={e =>
                    setFormData({ ...formData, type: e.target.value as 'income', category: '' })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Income</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={e =>
                    setFormData({ ...formData, type: e.target.value as 'expense', category: '' })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Expense</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories[formData.type].map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
