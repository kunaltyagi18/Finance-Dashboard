import { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionTable } from './components/TransactionTable';
import { Insights } from './components/Insights';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionTable />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <Header />

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">{renderView()}</div>
          </main>

          <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
            <p>&copy; 2026 Finance Dashboard. Built with React & Tailwind CSS.</p>
          </footer>
        </div>
      </div>
    </FinanceProvider>
  );
}

export default App;
