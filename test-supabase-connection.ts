// Test Supabase connection
import { supabase } from './src/lib/supabase';

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can access existing tables
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('count(*)');
    
    if (categoriesError) {
      console.log('Categories table access error:', categoriesError);
    } else {
      console.log('Categories table access: SUCCESS');
      console.log('Categories count:', categories);
    }
    
    // Test 2: Check if clothing_items table exists
    const { data: items, error: itemsError } = await supabase
      .from('clothing_items')
      .select('count(*)');
    
    if (itemsError) {
      console.log('Clothing items table access error:', itemsError);
    } else {
      console.log('Clothing items table access: SUCCESS');
      console.log('Clothing items count:', items);
    }
    
    console.log('Connection test completed.');
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

// Run the test
testConnection();