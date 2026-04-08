import { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Venue {
  id: string;
  name: string;
  address: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentPhone: '',
    venueId: '',
    batchOption: ''
  });
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    const { data, error } = await supabase
      .from('venues')
      .select('id, name, address')
      .order('name');

    if (error) {
      // Error fetching venues - silent fail
    } else {
      setVenues(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase
      .from('registrations')
      .insert({
        student_name: formData.studentName,
        parent_phone: formData.parentPhone,
        venue_id: formData.venueId,
        batch_option: formData.batchOption
      });

    setLoading(false);

    if (insertError) {
      setError('Failed to submit registration. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-50"></div>
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto relative" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">
            Registration Submitted!
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for registering with AI + NI Academy. We'll contact you soon.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <header className="bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-white/5 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/AINI_LOGO.png"
                alt="AI + NI Academy Logo"
                className="w-24 h-24 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI + NI Academy
                </h1>
                <p className="text-sm text-gray-400">Student Registration</p>
              </div>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-3xl overflow-hidden border border-white/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Register Now
            </h2>
            <p className="text-gray-400 mb-8">
              Fill in your details to join AI + NI Academy
            </p>

            {error && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="studentName" className="block text-sm font-semibold text-gray-300 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b0f1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter student's full name"
                />
              </div>

              <div>
                <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Parent Phone Number *
                </label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  required
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b0f1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter parent's phone number"
                />
              </div>

              <div>
                <label htmlFor="venueId" className="block text-sm font-semibold text-gray-300 mb-2">
                  Select Venue *
                </label>
                <select
                  id="venueId"
                  name="venueId"
                  required
                  value={formData.venueId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b0f1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0b0f1a]">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id} className="bg-[#0b0f1a]">
                      {venue.name} - {venue.address}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="batchOption" className="block text-sm font-semibold text-gray-300 mb-2">
                  Select Batch *
                </label>
                <select
                  id="batchOption"
                  name="batchOption"
                  required
                  value={formData.batchOption}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b0f1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0b0f1a]">Select a batch</option>
                  <option value="Option A" className="bg-[#0b0f1a]">Option A (Mon, Wed, Fri)</option>
                  <option value="Option B" className="bg-[#0b0f1a]">Option B (Tue, Thu, Sat)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 bg-[length:200%_100%] animate-gradient"
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
