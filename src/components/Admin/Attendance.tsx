import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Check, X, User } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Venue = Database['public']['Tables']['venues']['Row'];
type Batch = Database['public']['Tables']['batches']['Row'];
type Student = Database['public']['Tables']['students']['Row'];

interface AttendanceRecord {
  student_id: string;
  status: 'Present' | 'Absent';
}

export function Attendance() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Map<string, 'Present' | 'Absent'>>(new Map());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    if (selectedVenue) {
      loadBatches(selectedVenue);
    } else {
      setBatches([]);
      setSelectedBatch('');
    }
  }, [selectedVenue]);

  useEffect(() => {
    if (selectedBatch) {
      loadStudents(selectedBatch);
      loadExistingAttendance(selectedBatch, selectedDate);
    } else {
      setStudents([]);
      setAttendance(new Map());
    }
  }, [selectedBatch, selectedDate]);

  const loadVenues = async () => {
    try {
      const { data, error } = await supabase.from('venues').select('*').order('name');
      if (error) throw error;
      setVenues(data || []);
    } catch (error) {
      // Error loading venues - silent fail
    }
  };

  const loadBatches = async (venueId: string) => {
    try {
      const { data, error } = await supabase
        .from('batches')
        .select('*')
        .eq('venue_id', venueId)
        .order('batch_name');
      if (error) throw error;
      setBatches(data || []);
    } catch (error) {
      // Error loading batches - silent fail
    }
  };

  const loadStudents = async (batchId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('batch_id', batchId)
        .order('name');
      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      // Error loading students - silent fail
    } finally {
      setLoading(false);
    }
  };

  const loadExistingAttendance = async (batchId: string, date: string) => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('batch_id', batchId)
        .eq('date', date);

      if (error) throw error;

      const attendanceMap = new Map<string, 'Present' | 'Absent'>();
      data?.forEach((record) => {
        attendanceMap.set(record.student_id, record.status as 'Present' | 'Absent');
      });
      setAttendance(attendanceMap);
    } catch (error) {
      // Error loading attendance - silent fail
    }
  };

  const toggleAttendance = (studentId: string) => {
    const newAttendance = new Map(attendance);
    const current = newAttendance.get(studentId);

    if (current === 'Present') {
      newAttendance.set(studentId, 'Absent');
    } else if (current === 'Absent') {
      newAttendance.delete(studentId);
    } else {
      newAttendance.set(studentId, 'Present');
    }

    setAttendance(newAttendance);
  };

  const handleSaveAttendance = async () => {
    if (!selectedBatch || students.length === 0) {
      return;
    }

    setSaving(true);
    try {
      const attendanceRecords: AttendanceRecord[] = [];
      const absentStudents: Student[] = [];

      students.forEach((student) => {
        const status = attendance.get(student.id);
        if (status) {
          attendanceRecords.push({
            student_id: student.id,
            status,
          });

          if (status === 'Absent') {
            absentStudents.push(student);
          }
        }
      });

      for (const record of attendanceRecords) {
        const { error } = await supabase
          .from('attendance')
          .upsert({
            student_id: record.student_id,
            batch_id: selectedBatch,
            date: selectedDate,
            status: record.status,
          });

        if (error) throw error;
      }

      if (absentStudents.length > 0) {
        await sendAbsentNotifications(absentStudents);
      }
    } catch (error) {
      // Error saving attendance - silent fail
    } finally {
      setSaving(false);
    }
  };

  const sendAbsentNotifications = async (absentStudents: Student[]) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-absence-notification`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            students: absentStudents.map(s => ({
              name: s.name,
              parent_phone: s.parent_phone,
            })),
            date: selectedDate,
          }),
        }
      );

      if (!response.ok) {
        // Failed to send notifications - silent fail
      }
    } catch (error) {
      // Error sending notifications - silent fail
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Attendance</h1>
        <p className="text-gray-400 mt-1">Mark student attendance</p>
      </div>

      <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Venue
            </label>
            <select
              value={selectedVenue}
              onChange={(e) => {
                setSelectedVenue(e.target.value);
                setSelectedBatch('');
              }}
              className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
            >
              <option value="">Choose venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white disabled:opacity-50"
              disabled={!selectedVenue}
            >
              <option value="">Choose batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batch_name} - {batch.time_slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading students...</p>
        </div>
      ) : !selectedBatch ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Select a batch</h3>
          <p className="text-gray-400">Choose a venue and batch to mark attendance</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl p-12 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No students in this batch</h3>
          <p className="text-gray-400">Add students to this batch to mark attendance</p>
        </div>
      ) : (
        <div>
          <div className="bg-[#1a1f2e]/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0d1117] border-b border-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Parent Contact
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((student) => {
                    const status = attendance.get(student.id);
                    return (
                      <tr key={student.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                              {student.photo_url ? (
                                <img
                                  src={student.photo_url}
                                  alt={student.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <span className="font-medium text-white">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {student.parent_phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => toggleAttendance(student.id)}
                              className={`px-6 py-2 rounded-lg font-medium transition ${
                                status === 'Present'
                                  ? 'bg-green-500/20 text-green-400 ring-2 ring-green-500/50'
                                  : status === 'Absent'
                                  ? 'bg-blue-500/20 text-blue-500 ring-2 ring-blue-500/50'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              {status === 'Present' && (
                                <span className="flex items-center gap-2">
                                  <Check className="w-4 h-4" />
                                  Present
                                </span>
                              )}
                              {status === 'Absent' && (
                                <span className="flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  Absent
                                </span>
                              )}
                              {!status && 'Mark Attendance'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveAttendance}
              disabled={saving || attendance.size === 0}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-8 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
