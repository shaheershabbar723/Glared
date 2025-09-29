/*
  # Initial Schema Setup for AI Fashion Photography Platform

  1. New Tables
    - `categories` - Portfolio categories (men/women sections)
    - `clothing_items` - Individual clothing pieces
    - `clothing_images` - Multiple images per clothing item
    - `stripe_customers` - Stripe customer mappings
    - `stripe_subscriptions` - Subscription tracking
    - `stripe_orders` - One-time payment tracking

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public access and authenticated users
    - Set up proper foreign key relationships

  3. Storage
    - Create storage bucket for portfolio images
    - Set up public access policies for images
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  section text NOT NULL CHECK (section IN ('men', 'women')),
  banner_image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create clothing_items table
CREATE TABLE IF NOT EXISTS clothing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  thumbnail_image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;

-- Create clothing_images table
CREATE TABLE IF NOT EXISTS clothing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clothing_item_id uuid NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clothing_images ENABLE ROW LEVEL SECURITY;

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL UNIQUE,
  subscription_id text,
  price_id text,
  status text NOT NULL DEFAULT 'not_started',
  current_period_start integer,
  current_period_end integer,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_brand text,
  payment_method_last4 text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create stripe_orders table
CREATE TABLE IF NOT EXISTS stripe_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_session_id text NOT NULL UNIQUE,
  payment_intent_id text,
  customer_id text NOT NULL,
  amount_subtotal bigint,
  amount_total bigint,
  currency text,
  payment_status text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read access)
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for clothing_items (public read access)
CREATE POLICY "Anyone can view clothing items"
  ON clothing_items
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for clothing_images (public read access)
CREATE POLICY "Anyone can view clothing images"
  ON clothing_images
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for stripe_customers (users can only see their own)
CREATE POLICY "Users can view own stripe customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stripe customer data"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for stripe_subscriptions (service role access)
CREATE POLICY "Service role can manage subscriptions"
  ON stripe_subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for stripe_orders (service role access)
CREATE POLICY "Service role can manage orders"
  ON stripe_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to portfolio images
CREATE POLICY "Public can view portfolio images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload portfolio images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update portfolio images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to delete their uploaded images
CREATE POLICY "Authenticated users can delete portfolio images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images');