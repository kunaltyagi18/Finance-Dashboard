import { useFinance } from '../context/FinanceContext';
import { useMemo } from 'react';

export const LineChart = () => {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const last7Months = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date;
    }).reverse();

    return last7Months.map(date => {
      const monthStr = date.toISOString().slice(0, 7);
      const income = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(monthStr))
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(monthStr))
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        income,
        expenses
      };
    });
  }, [transactions]);

  const maxValue = Math.max(
    ...chartData.flatMap(d => [d.income, d.expenses])
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Income vs Expenses</h3>
      <div className="space-y-4">
        {chartData.map((data, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 w-12">{data.month}</span>
              <div className="flex-1 mx-4 flex gap-1">
                <div
                  className="bg-green-500 h-8 rounded transition-all"
                  style={{ width: `${(data.income / maxValue) * 100}%` }}
                  title={`Income: $${data.income.toLocaleString()}`}
                />
                <div
                  className="bg-red-500 h-8 rounded transition-all"
                  style={{ width: `${(data.expenses / maxValue) * 100}%` }}
                  title={`Expenses: $${data.expenses.toLocaleString()}`}
                />
              </div>
              <span className="text-gray-600 w-24 text-right">
                ${(data.income - data.expenses).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>
    </div>
  );
};
