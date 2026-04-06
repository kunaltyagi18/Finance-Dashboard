import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import DashboardCard from './DashboardCard';
import LineChart from './LineChart';
import PieChart from './PieChart';

const Dashboard = () => {
  const { stats } = useFinance();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Balance"
            value={`$${stats.totalBalance.toLocaleString()}`}
            icon={Wallet}
            bgColor="bg-blue-50"
            iconColor="bg-blue-500"
          />
          <DashboardCard
            title="Total Income"
            value={`$${stats.totalIncome.toLocaleString()}`}
            icon={TrendingUp}
            trend="12.5% from last month"
            trendUp={true}
            bgColor="bg-green-50"
            iconColor="bg-green-500"
          />
          <DashboardCard
            title="Total Expenses"
            value={`$${stats.totalExpenses.toLocaleString()}`}
            icon={TrendingDown}
            trend="8.2% from last month"
            trendUp={false}
            bgColor="bg-red-50"
            iconColor="bg-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;