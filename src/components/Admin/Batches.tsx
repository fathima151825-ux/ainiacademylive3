import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, X, Users, MapPin, Calendar, Clock } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Batch = Database['public']['Tables']['batches']['Row'];
type BatchInsert = Database['public']['Tables']['batches']['Insert'];
type Venue = Database['public']['Tables']['venues']['Row'];

interface BatchWithVenue extends Batch {
  venues: Venue | null;
}

export function Batches() {
  const [batches, setBatches] = useState<BatchWithVenue[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState<BatchInsert>({
    venue_id: '',
    batch_name: '',
    days: '',
    time_slot: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [batchesRes, venuesRes] = await Promise.all([
        supabase.from('batches').select('*, venues(*)').order('created_at', { ascending: false }),
        supabase.from('venues').select('*').order('name'),
      ]);

      if (batchesRes.error) throw batchesRes.error;
      if (venuesRes.error) throw venuesRes.error;

      setBatches(batchesRes.data || []);
      setVenues(venuesRes.data || []);
    } catch (error) {
      // Error loading data - silent fail
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.venue_id) {
      return;
    }

    try {
      if (editingBatch) {
        const { error } = await supabase
          .from('batches')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingBatch.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('batches').insert([formData]);
        if (error) throw error;
      }

      resetForm();
      loadData();
    } catch (error) {
      // Error saving batch - silent fail
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('batches').delete().eq('id', id);
      if (error) throw error;
      loadData();
    } catch (error) {
      // Error deleting batch - silent fail
    }
  };

  const handleEdit = (batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      venue_id: batch.venue_id,
      batch_name: batch.batch_name,
      days: batch.days,
      time_slot: batch.time_slot,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ venue_id: '', batch_name: '', days: '', time_slot: '' });
    setEditingBatch(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Batches</h1>
          <p className="text-gray-400 mt-1">Manage training batches</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add Batch
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
      ) : batches.length === 0 ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No batches yet</h3>
          <p className="text-gray-400 mb-4">
            {venues.length === 0
              ? 'Please add a venue first before creating batches'
              : 'Get started by adding your first batch'}
          </p>
          {venues.length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-6 py-2 rounded-lg transition"
            >
              Add Batch
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{batch.batch_name}</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {batch.venues?.name || 'Unknown Venue'}
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  {batch.days}
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  {batch.time_slot}
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleEdit(batch)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(batch.id)}
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
                {editingBatch ? 'Edit Batch' : 'Add Batch'}
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
                  Venue <span className="text-blue-500">*</span>
                </label>
                <select
                  value={formData.venue_id}
                  onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  required
                >
                  <option value="">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Batch Name
                </label>
                <input
                  type="text"
                  value={formData.batch_name}
                  onChange={(e) => setFormData({ ...formData, batch_name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="e.g., A1, A2, B1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Days
                </label>
                <select
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  required
                >
                  <option value="">Select days</option>
                  <option value="Mon/Wed/Fri">Mon/Wed/Fri</option>
                  <option value="Tue/Thu/Sat">Tue/Thu/Sat</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={formData.time_slot}
                  onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="e.g., 9:00 AM - 10:00 AM"
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
                  {editingBatch ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
