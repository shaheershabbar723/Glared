import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase connection.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

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