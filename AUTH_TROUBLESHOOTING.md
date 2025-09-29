# Authentication System Troubleshooting

This document provides guidance on troubleshooting issues with the authentication system and database migrations.

## Common Issues and Solutions

### 1. Tables Not Being Created

#### Issue: Tables are not appearing in Supabase
#### Possible Causes:
1. Migration files are not being executed
2. Migration files have syntax errors
3. Database connection issues
4. Insufficient permissions
5. Migration files not in correct order

#### Solutions:

1. **Check Migration Status**:
   - In Supabase dashboard, go to SQL Editor
   - Run: `SELECT * FROM supabase_migrations.schema_migrations;`
   - This will show which migrations have been applied

2. **Manual Execution**:
   - Copy the contents of `supabase/migrations/20250928100002_complete_auth_setup.sql`
   - Paste and run it directly in the Supabase SQL Editor

3. **Check for Errors**:
   - Look at Supabase logs for any error messages
   - In Supabase dashboard, go to Logs Explorer
   - Filter for "error" or "migration"

4. **Verify Database Connection**:
   - Ensure your Supabase credentials in `.env` are correct
   - Test connection with a simple query in your application

### 2. Migration File Issues

#### Issue: Migration files not being processed
#### Solutions:

1. **Check File Naming**:
   - Migration files must follow the pattern: `YYYYMMDDHHMMSS_name.sql`
   - Your files look correct: `20250928100000_auth_tables.sql`

2. **Check File Location**:
   - Migration files must be in `supabase/migrations/` directory
   - Your files are in the correct location

3. **Check File Permissions**:
   - Ensure files are readable
   - On Windows, this is usually not an issue

### 3. Testing the Connection

#### Manual Test:
1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run this query:
```sql
-- Test if we can create a simple table
CREATE TABLE IF NOT EXISTS test_table (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert a test row
INSERT INTO test_table DEFAULT VALUES;

-- Check if it was created
SELECT * FROM test_table;

-- Clean up
DROP TABLE test_table;
```

### 4. Running Migrations Manually

If automatic migrations aren't working:

1. **Using Supabase CLI**:
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

2. **Direct SQL Execution**:
   - Copy the SQL from migration files
   - Paste into Supabase SQL Editor
   - Execute each statement

### 5. Checking Existing Tables

To see what tables currently exist:
```sql
-- List all tables in public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check if profiles table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
);
```

### 6. Resetting Migrations (Use with Caution)

If you need to reset migrations:
```sql
-- WARNING: This will delete all data in your tables
-- Only use in development, never in production

-- Delete all data and reset migrations
DELETE FROM supabase_migrations.schema_migrations;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS clothing_items;
DROP TABLE IF EXISTS clothing_images;
-- Add other tables as needed
```

## Debugging Steps

1. **Verify Environment Variables**:
   - Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
   - Ensure they match your Supabase project settings

2. **Test Database Connection in Code**:
   ```javascript
   // Add this to a test component or function
   import { supabase } from './lib/supabase';
   
   async function testConnection() {
     try {
       const { data, error } = await supabase
         .from('categories')  // or any existing table
         .select('count(*)');
       
       if (error) {
         console.error('Connection error:', error);
       } else {
         console.log('Connection successful');
       }
     } catch (err) {
       console.error('Unexpected error:', err);
     }
   }
   ```

3. **Check Supabase Auth Settings**:
   - In Supabase Dashboard, go to Authentication > Settings
   - Ensure "Enable email signup" is turned on
   - Check that your Site URL is correct

## Next Steps

If tables are still not being created:

1. Try running the complete auth setup migration (`20250928100002_complete_auth_setup.sql`) directly in Supabase SQL Editor
2. Check Supabase logs for any error messages
3. Verify your project credentials are correct
4. If needed, contact Supabase support with details about your issue

## Manual Table Creation

If all else fails, you can manually create the tables by running the SQL from `test-auth-tables.sql` in the Supabase SQL Editor.

## Verification Steps

After creating the tables, verify they exist and are properly configured:

1. Check that the profiles table exists:
```sql
SELECT * FROM profiles LIMIT 5;
```

2. Check that RLS is enabled:
```sql
SELECT tablename, relname 
FROM pg_class pc 
JOIN pg_policy pp ON pc.oid = pp.polrelid 
WHERE tablename = 'profiles';
```

3. Test inserting a profile (you'll need to replace 'user-id' with an actual user ID):
```sql
-- Only run this if you have a valid user ID
-- INSERT INTO profiles (id, first_name, last_name, full_name) 
-- VALUES ('user-id', 'Test', 'User', 'Test User');
```