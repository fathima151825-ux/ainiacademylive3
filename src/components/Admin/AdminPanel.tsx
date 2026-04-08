import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Login } from '../Auth/Login';
import { Layout } from './Layout';
import { Dashboard } from './Dashboard';
import { Venues } from './Venues';
import { Batches } from './Batches';
import { Students } from './Students';
import { Staff } from './Staff';
import { Attendance } from './Attendance';
import { Payments } from './Payments';

export function AdminPanel() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (user.email !== 'admin@ainiacademy.com') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0d1117] to-[#1a0d1f] flex items-center justify-center p-4">
        <div className="bg-[#1a1f2e]/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/10 w-full max-w-md p-8 text-center">
          <div className="text-blue-500 text-6xl mb-4">⛔</div>
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-6">You do not have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'venues':
        return <Venues />;
      case 'batches':
        return <Batches />;
      case 'students':
        return <Students />;
      case 'staff':
        return <Staff />;
      case 'attendance':
        return <Attendance />;
      case 'payments':
        return <Payments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
