import { TrendingUp, Calendar, PieChart } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useMemo } from 'react';

export const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    const highestCategory = Object.entries(categoryTotals).sort(
      ([, a], [, b]) => b - a
    )[0];

    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStr = lastMonth.toISOString().slice(0, 7);

    const currentMonthExpenses = expenses
      .filter(t => t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = expenses
      .filter(t => t.date.startsWith(lastMonthStr))
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyChange = lastMonthExpenses > 0
      ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

    const avgDailySpending = expenses.length > 0
      ? expenses.reduce((sum, t) => sum + t.amount, 0) / 30
      : 0;

    const income = transactions.filter(t => t.type === 'income');
    const savingsRate = income.reduce((sum, t) => sum + t.amount, 0) > 0
      ? ((income.reduce((sum, t) => sum + t.amount, 0) -
          expenses.reduce((sum, t) => sum + t.amount, 0)) /
          income.reduce((sum, t) => sum + t.amount, 0)) * 100
      : 0;

    return {
      highestCategory: highestCategory
        ? { name: highestCategory[0], amount: highestCategory[1] }
        : null,
      monthlyChange,
      avgDailySpending,
      savingsRate,
      currentMonthExpenses,
      lastMonthExpenses
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Financial Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <PieChart className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Highest Spending Category</h3>
          </div>
          {insights.highestCategory ? (
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {insights.highestCategory.name}
              </p>
              <p className="text-lg text-gray-600">
                ${insights.highestCategory.amount.toLocaleString()} spent
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Focus on reducing expenses in this category to improve your savings.
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No expense data available</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Monthly Comparison</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights.currentMonthExpenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ${insights.lastMonthExpenses.toLocaleString()}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 text-sm font-medium ${
                insights.monthlyChange > 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {insights.monthlyChange > 0 ? '↑' : '↓'}{' '}
              {Math.abs(insights.monthlyChange).toFixed(1)}% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Average Daily Spending</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            ${insights.avgDailySpending.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Based on your spending patterns over the last 30 days
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Savings Rate</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {insights.savingsRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            {insights.savingsRate >= 20
              ? 'Excellent! You are saving well.'
              : insights.savingsRate >= 10
              ? 'Good progress. Consider increasing your savings.'
              : 'Try to reduce expenses and increase your savings rate.'}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>
              Aim for a savings rate of at least 20% to build a strong financial foundation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>
              Review your highest spending category monthly and look for ways to optimize.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>
              Track every transaction to maintain accurate insights into your financial health.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>
              Set up automatic transfers to savings to make saving effortless and consistent.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
