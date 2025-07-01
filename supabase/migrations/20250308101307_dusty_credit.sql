/*
  # Fix appointments RLS policies

  1. Changes
    - Update RLS policies to handle Firebase auth user IDs
    - Enable RLS on appointments table
    - Add policies for inserting and viewing appointments

  2. Security
    - Enable RLS
    - Add policy for authenticated users to insert their own appointments
    - Add policy for authenticated users to view their own appointments
*/

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;

-- Create policy for inserting appointments
CREATE POLICY "Users can create appointments"
ON appointments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid()::text = user_id
);

-- Create policy for viewing appointments
CREATE POLICY "Users can view their own appointments"
ON appointments
FOR SELECT
TO authenticated
USING (
  auth.uid()::text = user_id
);