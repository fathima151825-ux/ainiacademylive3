import { useState, useEffect } from 'react';
import { Plus, Search, Download, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Student {
  id: string;
  name: string;
  parent_phone: string;
}

interface Payment {
  id: string;
  invoice_number: string;
  payment_date: string;
  payment_mode: string;
  utr_number: string | null;
  cheque_number: string | null;
  cheque_date: string | null;
  bank_name: string | null;
  fees_amount: number;
  gst_enabled: boolean;
  gst_percentage: number;
  gst_amount: number;
  total_amount: number;
  description: string | null;
  created_at: string;
  students: {
    name: string;
    parent_phone: string;
  };
}

export function Payments() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    student_id: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_mode: 'Cash',
    utr_number: '',
    cheque_number: '',
    cheque_date: '',
    bank_name: '',
    fees_amount: '',
    gst_enabled: false,
    gst_percentage: '18',
    description: '',
  });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          students (
            name,
            parent_phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('id, name, parent_phone')
        .order('name');

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const generateInvoiceNumber = async () => {
    const today = new Date();
    const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');

    const { data, error } = await supabase
      .from('payments')
      .select('invoice_number')
      .like('invoice_number', `INV-${datePrefix}-%`)
      .order('invoice_number', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error generating invoice number:', error);
      return `INV-${datePrefix}-0001`;
    }

    if (data && data.length > 0) {
      const lastInvoice = data[0].invoice_number;
      const lastNumber = parseInt(lastInvoice.split('-')[2]);
      return `INV-${datePrefix}-${String(lastNumber + 1).padStart(4, '0')}`;
    }

    return `INV-${datePrefix}-0001`;
  };

  const calculateTotals = () => {
    const fees = parseFloat(formData.fees_amount) || 0;
    const gstPercentage = formData.gst_enabled ? parseFloat(formData.gst_percentage) || 0 : 0;
    const gstAmount = formData.gst_enabled ? (fees * gstPercentage) / 100 : 0;
    const totalAmount = fees + gstAmount;

    return {
      fees,
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.student_id || !formData.fees_amount) {
      alert('Please fill in all required fields');
      return;
    }

    const invoiceNumber = await generateInvoiceNumber();
    const totals = calculateTotals();

    try {
      const { error } = await supabase.from('payments').insert([
        {
          student_id: formData.student_id,
          invoice_number: invoiceNumber,
          payment_date: formData.payment_date,
          payment_mode: formData.payment_mode,
          utr_number: formData.payment_mode === 'UTR' ? formData.utr_number : null,
          cheque_number: formData.payment_mode === 'Cheque' ? formData.cheque_number : null,
          cheque_date: formData.payment_mode === 'Cheque' ? formData.cheque_date : null,
          bank_name: formData.bank_name || null,
          fees_amount: totals.fees,
          gst_enabled: formData.gst_enabled,
          gst_percentage: formData.gst_enabled ? parseFloat(formData.gst_percentage) : 0,
          gst_amount: formData.gst_enabled ? parseFloat(totals.gstAmount) : 0,
          total_amount: parseFloat(totals.totalAmount),
          description: formData.description || null,
          created_by: user?.id,
        },
      ]);

      if (error) throw error;

      setFormData({
        student_id: '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_mode: 'Cash',
        utr_number: '',
        cheque_number: '',
        cheque_date: '',
        bank_name: '',
        fees_amount: '',
        gst_enabled: false,
        gst_percentage: '18',
        description: '',
      });
      setShowForm(false);
      fetchPayments();
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Failed to create payment');
    }
  };

  const downloadInvoice = (payment: Payment) => {
    const student = payment.students;

    const invoiceContent = `
      AI + NI ACADEMY
      Invoice: ${payment.invoice_number}
      Date: ${new Date(payment.payment_date).toLocaleDateString()}

      Student: ${student.name}
      Contact: ${student.parent_phone}

      Payment Mode: ${payment.payment_mode}
      ${payment.utr_number ? `UTR Number: ${payment.utr_number}` : ''}
      ${payment.cheque_number ? `Cheque Number: ${payment.cheque_number}` : ''}
      ${payment.cheque_date ? `Cheque Date: ${new Date(payment.cheque_date).toLocaleDateString()}` : ''}
      ${payment.bank_name ? `Bank: ${payment.bank_name}` : ''}

      Fees: ₹${payment.fees_amount.toFixed(2)}
      ${payment.gst_enabled ? `GST (${payment.gst_percentage}%): ₹${payment.gst_amount.toFixed(2)}` : 'GST: Not Applicable'}
      Total: ₹${payment.total_amount.toFixed(2)}

      ${payment.description ? `Description: ${payment.description}` : ''}
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${payment.invoice_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      payment.invoice_number.toLowerCase().includes(searchLower) ||
      payment.students.name.toLowerCase().includes(searchLower)
    );
  });

  const totals = calculateTotals();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-gray-400 mt-1">Manage student payments and invoices</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Payment
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1a1f2e]/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">New Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Student *
                </label>
                <select
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.parent_phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  value={formData.payment_date}
                  onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Mode *
                </label>
                <select
                  value={formData.payment_mode}
                  onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Cash">Cash</option>
                  <option value="UTR">UTR (UPI/NEFT/RTGS)</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              {formData.payment_mode === 'UTR' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    UTR Number
                  </label>
                  <input
                    type="text"
                    value={formData.utr_number}
                    onChange={(e) => setFormData({ ...formData, utr_number: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter UTR number"
                  />
                </div>
              )}

              {formData.payment_mode === 'Cheque' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cheque Number
                    </label>
                    <input
                      type="text"
                      value={formData.cheque_number}
                      onChange={(e) => setFormData({ ...formData, cheque_number: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter cheque number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cheque Date
                    </label>
                    <input
                      type="date"
                      value={formData.cheque_date}
                      onChange={(e) => setFormData({ ...formData, cheque_date: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {(formData.payment_mode === 'UTR' || formData.payment_mode === 'Cheque') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bank_name}
                    onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter bank name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fees Amount (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.fees_amount}
                  onChange={(e) => setFormData({ ...formData, fees_amount: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.gst_enabled}
                    onChange={(e) => setFormData({ ...formData, gst_enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 font-medium">Enable GST</span>
                </label>

                {formData.gst_enabled && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">GST %:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.gst_percentage}
                      onChange={(e) => setFormData({ ...formData, gst_percentage: e.target.value })}
                      className="w-20 px-2 py-1 bg-[#0d1117] border border-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {formData.fees_amount && (
                <div className="bg-[#0d1117] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Fees Amount:</span>
                    <span>₹{totals.fees.toFixed(2)}</span>
                  </div>
                  {formData.gst_enabled ? (
                    <div className="flex justify-between text-gray-300">
                      <span>GST ({formData.gst_percentage}%):</span>
                      <span>₹{totals.gstAmount}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>GST:</span>
                      <span>Not Applicable</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-2">
                    <span>Total Amount:</span>
                    <span>₹{totals.totalAmount}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Optional notes about this payment"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Payment
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#1a1f2e]/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by invoice or student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No payments found</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm ? 'Try adjusting your search' : 'Add your first payment to get started'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Invoice</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Student</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Mode</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">GST</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-800 hover:bg-[#0d1117] transition-colors">
                    <td className="py-3 px-4 text-white font-mono text-sm">{payment.invoice_number}</td>
                    <td className="py-3 px-4">
                      <div className="text-white">{payment.students.name}</div>
                      <div className="text-gray-400 text-sm">{payment.students.parent_phone}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300">{payment.payment_mode}</span>
                      {payment.utr_number && (
                        <div className="text-xs text-gray-500">UTR: {payment.utr_number}</div>
                      )}
                      {payment.cheque_number && (
                        <div className="text-xs text-gray-500">Cheque: {payment.cheque_number}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-300">₹{payment.fees_amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {payment.gst_enabled ? `₹${payment.gst_amount.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">₹{payment.total_amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => downloadInvoice(payment)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Download Invoice"
                      >
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
