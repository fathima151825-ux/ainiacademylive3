/*
  # Create Registrations Table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `student_name` (text) - Name of the student
      - `parent_phone` (text) - Parent's phone number
      - `venue_id` (uuid, foreign key to venues) - Selected venue
      - `batch_option` (text) - Selected batch option (Option A or Option B)
      - `status` (text) - Registration status (pending/approved/rejected)
      - `created_at` (timestamptz) - Registration timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on registrations table
    - Allow public (anon) users to insert registrations (for form submission)
    - Allow authenticated users (admins) to view, update, and delete registrations
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  parent_phone text NOT NULL,
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  batch_option text NOT NULL CHECK (batch_option IN ('Option A', 'Option B')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_venue_id ON registrations(venue_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous users to insert registrations (public form submission)
CREATE POLICY "Anyone can submit registrations"
  ON registrations FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: Allow authenticated users to view all registrations
CREATE POLICY "Authenticated users can view registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow authenticated users to update registrations
CREATE POLICY "Authenticated users can update registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Allow authenticated users to delete registrations
CREATE POLICY "Authenticated users can delete registrations"
  ON registrations FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policy: Allow anonymous users to view venues (needed for dropdown)
CREATE POLICY "Anyone can view venues"
  ON venues FOR SELECT
  TO anon
  USING (true);