import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, X, MapPin, Phone } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Venue = Database['public']['Tables']['venues']['Row'];
type VenueInsert = Database['public']['Tables']['venues']['Insert'];

export function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [formData, setFormData] = useState<VenueInsert>({
    name: '',
    address: '',
    contact_number: '',
  });

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVenues(data || []);
    } catch (error) {
      // Error loading venues - silent fail
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVenue) {
        const { error } = await supabase
          .from('venues')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingVenue.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('venues').insert([formData]);
        if (error) throw error;
      }

      resetForm();
      loadVenues();
    } catch (error) {
      // Error saving venue - silent fail
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('venues').delete().eq('id', id);
      if (error) throw error;
      loadVenues();
    } catch (error) {
      // Error deleting venue - silent fail
    }
  };

  const handleEdit = (venue: Venue) => {
    setEditingVenue(venue);
    setFormData({
      name: venue.name,
      address: venue.address,
      contact_number: venue.contact_number,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', contact_number: '' });
    setEditingVenue(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Venues</h1>
          <p className="text-gray-400 mt-1">Manage academy locations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add Venue
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
      ) : venues.length === 0 ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No venues yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first venue</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-6 py-2 rounded-lg transition"
          >
            Add Venue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <h3 className="text-xl font-bold text-white mb-3">{venue.name}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {venue.address}
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {venue.contact_number}
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleEdit(venue)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(venue.id)}
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
                {editingVenue ? 'Edit Venue' : 'Add Venue'}
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
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="e.g., Anna Nagar Branch"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Full address"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.contact_number}
                  onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
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
                  {editingVenue ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
