/*
  # Academy Management System Database Schema

  1. New Tables
    - `venues`
      - `id` (uuid, primary key)
      - `name` (text) - Venue name
      - `address` (text) - Location/address
      - `contact_number` (text) - Contact phone number
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `batches`
      - `id` (uuid, primary key)
      - `venue_id` (uuid, foreign key to venues) - REQUIRED
      - `batch_name` (text) - Batch identifier (A1, A2, B1, etc.)
      - `days` (text) - Days of the week (e.g., "Mon/Wed/Fri")
      - `time_slot` (text) - Time slot (e.g., "9:00 AM - 10:00 AM")
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `students`
      - `id` (uuid, primary key)
      - `name` (text) - Student full name
      - `photo_url` (text) - URL to student photo
      - `parent_phone` (text) - Parent contact number
      - `batch_id` (uuid, foreign key to batches) - Assigned batch
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `staff`
      - `id` (uuid, primary key)
      - `name` (text) - Staff member name
      - `role` (text) - Role (Faculty/Support Staff)
      - `contact` (text) - Contact number
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key to students)
      - `batch_id` (uuid, foreign key to batches)
      - `date` (date) - Attendance date
      - `status` (text) - Present/Absent
      - `created_at` (timestamptz)
      - Unique constraint on (student_id, date)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users to manage all data
    - Students and attendance data accessible only to authenticated users
*/

-- Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  contact_number text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create batches table
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  batch_name text NOT NULL,
  days text NOT NULL,
  time_slot text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo_url text,
  parent_phone text NOT NULL,
  batch_id uuid REFERENCES batches(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  contact text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL CHECK (status IN ('Present', 'Absent')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_batches_venue_id ON batches(venue_id);
CREATE INDEX IF NOT EXISTS idx_students_batch_id ON students(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_batch_id ON attendance(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Enable Row Level Security
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- RLS Policies for venues
CREATE POLICY "Authenticated users can view venues"
  ON venues FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert venues"
  ON venues FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update venues"
  ON venues FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete venues"
  ON venues FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for batches
CREATE POLICY "Authenticated users can view batches"
  ON batches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert batches"
  ON batches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update batches"
  ON batches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete batches"
  ON batches FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for students
CREATE POLICY "Authenticated users can view students"
  ON students FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for staff
CREATE POLICY "Authenticated users can view staff"
  ON staff FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert staff"
  ON staff FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update staff"
  ON staff FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete staff"
  ON staff FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for attendance
CREATE POLICY "Authenticated users can view attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert attendance"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendance"
  ON attendance FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attendance"
  ON attendance FOR DELETE
  TO authenticated
  USING (true);