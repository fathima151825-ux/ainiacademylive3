import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, MapPin, Users, GraduationCap, CircleUser as UserCircle, ClipboardCheck, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'venues', label: 'Venues', icon: MapPin },
    { id: 'batches', label: 'Batches', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'staff', label: 'Staff', icon: UserCircle },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/5 z-20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/AINI_LOGO.png"
            alt="AI + NI Academy Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI + NI Academy</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-lg text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-30 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d1117]/95 backdrop-blur-xl border-r border-white/5 z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/AINI_LOGO.png"
              alt="AI + NI Academy Logo"
              className="w-20 h-20 object-contain"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI + NI Academy</h1>
          </div>
          <p className="text-sm text-gray-400">Admin Portal</p>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-500 hover:bg-blue-500/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
