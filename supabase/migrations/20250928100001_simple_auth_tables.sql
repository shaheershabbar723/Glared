-- Simple Auth Tables Migration
-- This is a simplified version to test if tables are being created

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Simple policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Grant permissions
GRANT ALL ON TABLE profiles TO authenticated;