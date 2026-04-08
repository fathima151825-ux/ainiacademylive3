import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, X, GraduationCap, Phone, Camera, User } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Student = Database['public']['Tables']['students']['Row'];
type StudentInsert = Database['public']['Tables']['students']['Insert'];
type Batch = Database['public']['Tables']['batches']['Row'];

interface StudentWithBatch extends Student {
  batches: Batch | null;
}

export function Students() {
  const [students, setStudents] = useState<StudentWithBatch[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<StudentInsert>({
    name: '',
    photo_url: null,
    parent_phone: '',
    batch_id: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsRes, batchesRes] = await Promise.all([
        supabase.from('students').select('*, batches(*)').order('created_at', { ascending: false }),
        supabase.from('batches').select('*').order('batch_name'),
      ]);

      if (studentsRes.error) throw studentsRes.error;
      if (batchesRes.error) throw batchesRes.error;

      setStudents(studentsRes.data || []);
      setBatches(batchesRes.data || []);
    } catch (error) {
      // Error loading data - silent fail with empty state
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    if (file.size > maxSize) {
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedExts = ['jpg', 'jpeg', 'png', 'webp'];

      if (!fileExt || !allowedExts.includes(fileExt)) {
        return;
      }

      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `student-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData({ ...formData, photo_url: publicUrl });
      setPhotoPreview(URL.createObjectURL(file));
    } catch (error) {
      // Error uploading photo - photo remains optional
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        const { error } = await supabase
          .from('students')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingStudent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('students').insert([formData]);
        if (error) throw error;
      }

      resetForm();
      loadData();
    } catch (error) {
      // Error saving student - silent fail
    }
  };

  const handleDelete = async (id: string) => {
    // Delete without confirmation for smoother UX
    try {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (error) throw error;
      loadData();
    } catch (error) {
      // Error deleting student - silent fail
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      photo_url: student.photo_url,
      parent_phone: student.parent_phone,
      batch_id: student.batch_id,
    });
    setPhotoPreview(student.photo_url);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', photo_url: null, parent_phone: '', batch_id: null });
    setEditingStudent(null);
    setPhotoPreview(null);
    setShowModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Students</h1>
          <p className="text-gray-400 mt-1">Manage student records</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add Student
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
      ) : students.length === 0 ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No students yet</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first student</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-6 py-2 rounded-lg transition"
          >
            Add Student
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {student.photo_url ? (
                    <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">{student.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {student.parent_phone}
                  </p>
                  {student.batches && (
                    <p className="text-sm text-blue-500 mt-1">Batch: {student.batches.batch_name}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleEdit(student)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl max-w-md w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {editingStudent ? 'Edit Student' : 'Add Student'}
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
                  Student Photo
                </label>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Student Name
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
                  Parent Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.parent_phone}
                  onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                  placeholder="e.g., +91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Assigned Batch
                </label>
                <select
                  value={formData.batch_id || ''}
                  onChange={(e) => setFormData({ ...formData, batch_id: e.target.value || null })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                >
                  <option value="">Select a batch (optional)</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.id}>
                      {batch.batch_name}
                    </option>
                  ))}
                </select>
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
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {editingStudent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
