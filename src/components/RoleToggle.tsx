import { Shield, Eye } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const RoleToggle = () => {
  const { userRole, setUserRole } = useFinance();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setUserRole(userRole === 'admin' ? 'viewer' : 'admin')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          userRole === 'admin'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {userRole === 'admin' ? (
          <>
            <Shield className="w-4 h-4" />
            Admin
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            Viewer
          </>
        )}
      </button>
      <span className="text-sm text-gray-600">
        {userRole === 'admin' ? 'Full access' : 'View only'}
      </span>
    </div>
  );
};
