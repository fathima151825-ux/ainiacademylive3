import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MapPin, Users, GraduationCap, CircleUser as UserCircle } from 'lucide-react';

interface Stats {
  venues: number;
  batches: number;
  students: number;
  staff: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({ venues: 0, batches: 0, students: 0, staff: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [venuesRes, batchesRes, studentsRes, staffRes] = await Promise.all([
        supabase.from('venues').select('id', { count: 'exact', head: true }),
        supabase.from('batches').select('id', { count: 'exact', head: true }),
        supabase.from('students').select('id', { count: 'exact', head: true }),
        supabase.from('staff').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        venues: venuesRes.count || 0,
        batches: batchesRes.count || 0,
        students: studentsRes.count || 0,
        staff: staffRes.count || 0,
      });
    } catch (error) {
      // Error loading stats - silent fail
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Venues', value: stats.venues, icon: MapPin, color: 'red' },
    { label: 'Total Batches', value: stats.batches, icon: Users, color: 'red' },
    { label: 'Total Students', value: stats.students, icon: GraduationCap, color: 'red' },
    { label: 'Total Staff', value: stats.staff, icon: UserCircle, color: 'red' },
  ];

  const colorClasses = {
    red: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-500',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to AI + NI Academy Management System</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-12 w-12 bg-white/5 rounded-lg mb-4" />
              <div className="h-4 bg-white/5 rounded w-24 mb-2" />
              <div className="h-8 bg-white/5 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/20 transition">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
