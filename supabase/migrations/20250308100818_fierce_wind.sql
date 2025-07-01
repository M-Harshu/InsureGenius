/*
  # Modify appointments table user_id type

  1. Changes
    - Drop existing RLS policies
    - Change user_id column type from UUID to TEXT to support Firebase auth IDs
    - Drop the foreign key constraint
    - Create new RLS policies with TEXT user_id

  2. Security
    - Maintain RLS policies with updated user_id type
    - Ensure authenticated users can only access their own appointments
*/

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can create appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;

-- Temporarily disable RLS to make changes
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- Drop the foreign key constraint
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_user_id_fkey;

-- Change user_id type to TEXT
ALTER TABLE appointments ALTER COLUMN user_id TYPE TEXT;

-- Re-enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create new policies with TEXT comparison
CREATE POLICY "Users can create appointments"
ON appointments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own appointments"
ON appointments
FOR SELECT
TO authenticated
USING (auth.uid()::text = user_id);