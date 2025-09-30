/*
  # Create Contacts Table
  This migration creates a table to store contact form submissions.
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies - allow anonymous inserts, authenticated users can read
CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant permissions
GRANT INSERT ON TABLE contacts TO anon;
GRANT SELECT ON TABLE contacts TO authenticated;

-- Add table to Supabase TypeScript types
-- This will be automatically picked up by the Supabase CLI when generating types