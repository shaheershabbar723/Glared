/*
# Glared Portfolio Database Schema

1. New Tables
   - `categories` - Dynamic categories under Men/Women sections
     - `id` (uuid, primary key)
     - `name` (text, category name)
     - `section` (text, 'men' or 'women')
     - `banner_image` (text, banner image URL)
     - `created_at` (timestamp)
   
   - `clothing_items` - Individual clothing items
     - `id` (uuid, primary key)
     - `category_id` (uuid, foreign key to categories)
     - `name` (text, item name)
     - `description` (text, item description)
     - `thumbnail_image` (text, main display image)
     - `created_at` (timestamp)
   
   - `clothing_images` - Multiple images per clothing item
     - `id` (uuid, primary key)
     - `clothing_item_id` (uuid, foreign key to clothing_items)
     - `image_url` (text, image URL)
     - `display_order` (integer, order for hover animation)
     - `created_at` (timestamp)

2. Security
   - Enable RLS on all tables
   - Add policies for authenticated admin users
   - Public read access for portfolio display
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  section text NOT NULL CHECK (section IN ('men', 'women')),
  banner_image text,
  created_at timestamptz DEFAULT now()
);

-- Clothing items table
CREATE TABLE IF NOT EXISTS clothing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  thumbnail_image text,
  created_at timestamptz DEFAULT now()
);

-- Clothing images table for hover variations
CREATE TABLE IF NOT EXISTS clothing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clothing_item_id uuid REFERENCES clothing_items(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_images ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio display
CREATE POLICY "Allow public read access to categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to clothing_items"
  ON clothing_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to clothing_images"
  ON clothing_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin write access (requires authentication)
CREATE POLICY "Allow authenticated users to manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage clothing_items"
  ON clothing_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage clothing_images"
  ON clothing_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Allow public read access to images
CREATE POLICY "Allow public read access to portfolio images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated users to update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated users to delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images');