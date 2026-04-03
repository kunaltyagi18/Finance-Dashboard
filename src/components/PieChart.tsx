import { useFinance } from '../context/FinanceContext';
import { useMemo } from 'react';

export const PieChart = () => {
  const { transactions } = useFinance();

  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / total) * 100
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }, [transactions]);

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500'
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
      {categoryData.length > 0 ? (
        <div className="space-y-4">
          {categoryData.map((data, idx) => (
            <div key={data.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[idx]}`} />
                  <span className="text-sm font-medium text-gray-700">{data.category}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ${data.amount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[idx]}`}
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {data.percentage.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 text-gray-400">
          <p>No expense data available</p>
        </div>
      )}
    </div>
  );
};
