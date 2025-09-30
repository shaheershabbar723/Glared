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
    }
    
    // Test 2: Check if profiles table exists
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count(*)');
    
    if (profilesError) {
      console.log('Profiles table access error (may not exist yet):', profilesError);
    } else {
      console.log('Profiles table access: SUCCESS');
    }
    
    // Test 3: Check auth status
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Auth session status:', session ? 'ACTIVE' : 'NONE');
    
    console.log('Connection test completed.');
  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

// Run the test
testConnection();