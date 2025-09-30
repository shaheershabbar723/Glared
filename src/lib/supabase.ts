import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdmxhdWVtb2RobnVldnNhb2R4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk4MDY4NSwiZXhwIjoyMDc0NTU2Njg1fQ.uMrEV2GJq__AI7G-JBul93msBE0hXjd4mn9JP1z1GJQ';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase connection.');
}

// Regular client for public access
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client with service role key to bypass RLS
export const adminSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Define the Category type based on the actual table structure
export type Category = {
  id: string;
  name: string;
  section: 'men' | 'women';
  banner_image: string | null;
  created_at: string;
};

// Define the ClothingItem type based on the actual table structure
export type ClothingItem = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  thumbnail_image: string | null;
  created_at: string;
};

// Define the ClothingImage type based on the actual table structure
export type ClothingImage = {
  id: string;
  clothing_item_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          section: string;
          banner_image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          section: string;
          banner_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          section?: string;
          banner_image?: string | null;
          created_at?: string;
        };
      };
      clothing_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string | null;
          thumbnail_image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string | null;
          thumbnail_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string | null;
          thumbnail_image?: string | null;
          created_at?: string;
        };
      };
      clothing_images: {
        Row: {
          id: string;
          clothing_item_id: string;
          image_url: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          clothing_item_id: string;
          image_url: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          clothing_item_id?: string;
          image_url?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
};