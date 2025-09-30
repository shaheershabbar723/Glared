/*
  # Admin RLS Bypass Configuration
  This migration ensures that the service role can bypass RLS for admin operations.
*/

-- Ensure RLS is enabled on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_images ENABLE ROW LEVEL SECURITY;

-- Create policies that allow service role to bypass RLS
CREATE POLICY "Allow service role full access to categories"
  ON categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to clothing_items"
  ON clothing_items FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to clothing_images"
  ON clothing_images FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create storage policies that allow service role to bypass RLS
CREATE POLICY "Allow service role full access to portfolio images"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'portfolio-images')
  WITH CHECK (bucket_id = 'portfolio-images');

-- Grant necessary permissions to service_role
GRANT ALL ON TABLE categories TO service_role;
GRANT ALL ON TABLE clothing_items TO service_role;
GRANT ALL ON TABLE clothing_images TO service_role;
GRANT ALL ON TABLE storage.objects TO service_role;