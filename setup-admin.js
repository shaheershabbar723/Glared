// Admin setup script for Glared Portfolio Platform
// This script provides information about accessing the admin panel

console.log('=====================================');
console.log('GLARED Admin Panel Access');
console.log('=====================================');
console.log('');
console.log('The admin panel is now accessible directly at /admin without authentication.');
console.log('');
console.log('To access the admin panel:');
console.log('1. Navigate to http://localhost:5173/admin (in development)');
console.log('2. Navigate to /admin on your deployed site (in production)');
console.log('');
console.log('No login credentials are required.');
console.log('');
console.log('=====================================');
// This script creates an admin user in Supabase

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key needed for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'shaheer.shabbar@gmail.com',
      password: 'fryingpan723',
      email_confirm: true // Auto-confirm the email
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('Email:', data.user.email);
    console.log('User ID:', data.user.id);
    console.log('\nYou can now sign in to the admin panel at /admin with these credentials:');
    console.log('Email: shaheer.shabbar@gmail.com');
    console.log('Password: fryingpan723');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createAdminUser();