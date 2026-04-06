// A single summary card — shows title, value, optional trend
const DashboardCard = ({ title, value, icon: Icon, trend, trendUp, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          {trend && (
            <p className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`${iconColor} p-4 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;