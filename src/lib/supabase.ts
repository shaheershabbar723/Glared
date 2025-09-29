import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface Category {
  id: string;
  name: string;
  section: 'men' | 'women';
  banner_image?: string;
  created_at: string;
}

export interface ClothingItem {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  thumbnail_image?: string;
  created_at: string;
  category?: Category;
}

export interface ClothingImage {
  id: string;
  clothing_item_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}