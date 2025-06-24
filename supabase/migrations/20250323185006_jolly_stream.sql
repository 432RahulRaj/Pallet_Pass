/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `event_date` (date)
      - `event_time` (text)
      - `adult_tickets` (integer)
      - `senior_tickets` (integer)
      - `student_tickets` (integer)
      - `child_tickets` (integer)
      - `total_amount` (integer)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Create their own bookings
      - Read their own bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_date date NOT NULL,
  event_time text NOT NULL,
  adult_tickets integer DEFAULT 0,
  senior_tickets integer DEFAULT 0,
  student_tickets integer DEFAULT 0,
  child_tickets integer DEFAULT 0,
  total_amount integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);