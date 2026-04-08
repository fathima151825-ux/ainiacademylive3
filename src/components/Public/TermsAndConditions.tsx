import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0d1117] to-[#0b0f1a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-gradient-to-br from-[#1a1f2e]/80 to-[#0f1419]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and enrolling in AI + NI Academy programs, you agree to be bound by these Terms and Conditions.
                If you do not agree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Registration and Enrollment</h2>
              <p className="mb-3">
                To enroll in our programs, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Be at least 16 years of age, or have parental consent if under 18</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Course Fees and Payment</h2>
              <p className="mb-3">
                All course fees are clearly stated during the registration process. Payment terms include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fees must be paid in full before course commencement unless otherwise agreed</li>
                <li>Payment can be made through approved payment methods</li>
                <li>Fees are non-refundable except as specified in our refund policy</li>
                <li>We reserve the right to modify course fees with prior notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Attendance and Participation</h2>
              <p className="mb-3">
                Students are expected to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain at least 75% attendance to be eligible for certification</li>
                <li>Actively participate in classes and complete assignments</li>
                <li>Respect instructors and fellow students</li>
                <li>Follow the academy's code of conduct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p>
                All course materials, including but not limited to lectures, presentations, assignments, and study materials,
                are the intellectual property of AI + NI Academy and Novamax Studios. Students may not reproduce, distribute,
                or commercially exploit any course materials without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Refund Policy</h2>
              <p className="mb-3">
                Refunds may be provided under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full refund if cancellation is made 7 days before course start date</li>
                <li>50% refund if cancellation is made 3-7 days before course start date</li>
                <li>No refund after course commencement</li>
                <li>Refunds are processed within 14 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Certification</h2>
              <p>
                Certificates are awarded to students who successfully complete the course requirements, including minimum
                attendance, assignment completion, and passing examinations. Certificates are issued in digital format and
                can be verified through our official channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Code of Conduct</h2>
              <p className="mb-3">
                Students must adhere to our code of conduct, which prohibits:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Harassment, discrimination, or offensive behavior</li>
                <li>Cheating or plagiarism in assignments and exams</li>
                <li>Unauthorized recording or distribution of class sessions</li>
                <li>Any illegal activities on academy premises or platforms</li>
              </ul>
              <p className="mt-3">
                Violation of the code of conduct may result in suspension or expulsion without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Privacy and Data Protection</h2>
              <p>
                We collect and process personal information in accordance with applicable data protection laws.
                Your information will be used solely for educational purposes and will not be shared with third
                parties without your consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p>
                AI + NI Academy and Novamax Studios shall not be liable for any indirect, incidental, or consequential
                damages arising from the use of our services. Our total liability is limited to the amount of fees paid
                by the student for the specific course.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Course Modifications</h2>
              <p>
                We reserve the right to modify course content, schedules, or instructors as necessary. Students will be
                notified of any significant changes in advance. In case of course cancellation by the academy, students
                will receive a full refund or be offered an alternative course.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
              <p>
                We reserve the right to terminate a student's enrollment for breach of these terms, non-payment of fees,
                or violation of the code of conduct. Termination will be communicated in writing, and refund eligibility
                will be determined on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
              <p>
                We may update these Terms and Conditions from time to time. Changes will be posted on our website, and
                continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <p className="mb-3">
                For questions or concerns regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-[#0b0f1a]/50 rounded-lg p-4 space-y-2">
                <p>AI + NI Academy</p>
                <p>Chennai, Tamil Nadu</p>
                <p>Phone: +91 98403 25253</p>
                <p>Email: info@ainiacademy.com</p>
              </div>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Novamax Studios. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
