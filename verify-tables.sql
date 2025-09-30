-- Verification script to check if tables exist and are properly configured

-- Check if profiles table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
) AS profiles_table_exists;

-- Check if auth.users table exists (should already exist)
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'auth' 
  AND table_name = 'users'
) AS auth_users_table_exists;

-- List all tables in public schema
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS status for profiles table
SELECT 
  schemaname, 
  tablename, 
  rowsecurity AS rls_enabled
FROM pg_tables 
WHERE tablename = 'profiles';

-- List policies on profiles table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'profiles';

-- Check if the trigger functions exist
SELECT 
  proname AS function_name,
  provolatile AS volatility
FROM pg_proc 
WHERE proname IN ('handle_new_user', 'update_full_name');

-- Test if we can insert into profiles (this will fail if no user exists)
-- Uncomment and replace 'test-uuid' with a valid UUID if you want to test
-- INSERT INTO profiles (id, first_name, last_name, full_name) 
-- VALUES ('test-uuid', 'Test', 'User', 'Test User');