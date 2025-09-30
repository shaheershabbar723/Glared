import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Check if client is properly initialized
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    // Test 2: Simple health check
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection successful!', data);
    return { success: true, data };
    
  } catch (err) {
    console.error('Connection test failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Test specific operations
export async function testSupabaseOperations() {
  try {
    // Test categories table
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);
    
    if (catError) {
      console.error('Categories query error:', catError);
      return { categories: null, error: catError.message };
    }
    
    console.log('Categories fetched:', categories);
    
    // Test clothing_items table
    const { data: items, error: itemError } = await supabase
      .from('clothing_items')
      .select('*')
      .limit(5);
    
    if (itemError) {
      console.error('Clothing items query error:', itemError);
      return { items: null, error: itemError.message };
    }
    
    console.log('Clothing items fetched:', items);
    
    return { 
      success: true, 
      categories: categories?.length || 0, 
      items: items?.length || 0 
    };
    
  } catch (err) {
    console.error('Operations test failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}