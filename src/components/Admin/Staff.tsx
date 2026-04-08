import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, X, CircleUser as UserCircle, Phone, Briefcase } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Staff = Database['public']['Tables']['staff']['Row'];
type StaffInsert = Database['public']['Tables']['staff']['Insert'];

export function Staff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<StaffInsert>({
    name: '',
    role: '',
    contact: '',
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStaff(data || []);
    } catch (error) {
      // Error loading staff - silent fail
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingStaff) {
        const { error } = await supabase
          .from('staff')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingStaff.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('staff').insert([formData]);
        if (error) throw error;
      }

      resetForm();
      loadStaff();
    } catch (error) {
      // Error saving staff - silent fail
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('staff').delete().eq('id', id);
      if (error) throw error;
      loadStaff();
    } catch (error) {
      // Error deleting staff - silent fail
    }
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      role: staffMember.role,
      contact: staffMember.contact,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', contact: '' });
    setEditingStaff(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Staff</h1>
          <p className="text-gray-400 mt-1">Manage faculty and support staff</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-white/5 rounded w-32 mb-4" />
              <div className="h-4 bg-white/5 rounded w-full mb-2" />
              <div className="h-4 bg-white/5 rounded w-24" />
            </div>
          ))}
        </div>
      ) : staff.length === 0 ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No staff members yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first staff member</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-6 py-2 rounded-lg transition"
          >
            Add Staff
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((staffMember) => (
            <div key={staffMember.id} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">{staffMember.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {staffMember.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {staffMember.contact}
              </p>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleEdit(staffMember)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staffMember.id)}
                  className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {editingStaff ? 'Edit Staff' : 'Add Staff'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white/5 rounded-lg transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  required
                >
                  <option value="">Select role</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Support Staff">Support Staff</option>
                  <option value="Admin">Admin</option>
                  <option value="Coordinator">Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="e.g., +91 98765 43210"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  {editingStaff ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
