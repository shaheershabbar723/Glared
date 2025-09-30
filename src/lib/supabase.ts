import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase connection.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Category {
  id: string;
  name: string;
  section: 'men' | 'women';
  banner_image: string | null;
  created_at: string;
}

export interface ClothingItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  thumbnail_image: string | null;
  created_at: string;
}

export interface ClothingImage {
  id: string;
  clothing_item_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

// Helper function to get public URL for images
export function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  
  // If it's already a full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, construct the public URL
  try {
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(imagePath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          updated_at?: string;
        };
      };
      routes: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          distance: number;
          duration: number;
          difficulty: 'easy' | 'intermediate' | 'hard';
          elevation_gain: number | null;
          max_elevation: number | null;
          start_location: any;
          end_location: any;
          route_points: any;
          start_point_name: string | null;
          end_point_name: string | null;
          elevation_profile: any;
          category_id: string | null;
          images: string[] | null;
          rating: number;
          review_count: number;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
          gpx_file_url: string | null;
          google_maps_url: string | null;
          state: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          distance: number;
          duration: number;
          difficulty: 'easy' | 'intermediate' | 'hard';
          elevation_gain?: number | null;
          max_elevation?: number | null;
          start_location?: any;
          end_location?: any;
          route_points?: any;
          start_point_name?: string | null;
          end_point_name?: string | null;
          elevation_profile?: any;
          category_id?: string | null;
          images?: string[] | null;
          rating?: number;
          review_count?: number;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
          gpx_file_url?: string | null;
          google_maps_url?: string | null;
          state?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          distance?: number;
          duration?: number;
          difficulty?: 'easy' | 'intermediate' | 'hard';
          elevation_gain?: number | null;
          max_elevation?: number | null;
          start_location?: any;
          end_location?: any;
          route_points?: any;
          start_point_name?: string | null;
          end_point_name?: string | null;
          elevation_profile?: any;
          category_id?: string | null;
          images?: string[] | null;
          rating?: number;
          review_count?: number;
          tags?: string[] | null;
          updated_at?: string;
          gpx_file_url?: string | null;
          google_maps_url?: string | null;
          state?: string | null;
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
    };
  };
};