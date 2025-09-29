# Authentication System

This document explains how to set up and use the authentication system in the GLARED application.

## Setup Instructions

### 1. Database Migration

Run the SQL migration file to set up the necessary tables:

```sql
-- This migration is already included in: supabase/migrations/20250928100000_auth_tables.sql
```

The migration creates:
- A `profiles` table to store additional user information
- Row Level Security (RLS) policies
- A trigger function to automatically create profiles when users sign up
- A trigger function to automatically update the full_name field

### 2. Environment Variables

Ensure your `.env` file includes the Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Auth Configuration

In your Supabase dashboard, go to Authentication > Settings and configure:

1. **Site URL**: Set to your application's URL (e.g., http://localhost:5173)
2. **Redirect URLs**: Add your application's URLs
3. **Enable Email Signup**: Make sure this is enabled

## Components

### AuthContext (`src/contexts/AuthContext.tsx`)

Provides authentication state and functions throughout the application:
- `user`: Current user object
- `session`: Current session object
- `loading`: Loading state
- `signUp()`: Register a new user
- `signIn()`: Sign in with email and password
- `signOut()`: Sign out the current user

### Pages

1. **SignIn** (`src/pages/auth/SignIn.tsx`): Email/password sign in form
2. **SignUp** (`src/pages/auth/SignUp.tsx`): User registration form
3. **Profile** (`src/pages/auth/Profile.tsx`): User profile management
4. **ForgotPassword** (`src/pages/auth/ForgotPassword.tsx`): Password reset request
5. **UpdatePassword** (`src/pages/auth/UpdatePassword.tsx`): Password update form

## Usage

### Protecting Routes

Use the `ProtectedRoute` component to protect routes that require authentication:

```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

### Accessing Auth State

Use the `useAuth()` hook to access authentication state and functions:

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signOut } = useAuth();
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return <div>Hello, {user.email}!</div>;
}
```

## Features

- Email/Password Authentication
- User Profile Management
- Password Reset Flow
- Responsive Design
- Loading States
- Error Handling
- Protected Routes
- Automatic Full Name Generation

## Customization

### Styling

All components use Tailwind CSS classes that can be customized to match your design system.

### Profile Fields

To add more fields to the user profile:
1. Update the `profiles` table in the SQL migration
2. Modify the profile update form in `Profile.tsx`
3. Update the trigger functions if needed

### Email Templates

Configure email templates in your Supabase dashboard under Authentication > Email Templates.

## Troubleshooting

### "generation expression is not immutable" Error

If you encounter this error when running the migration, it means the database doesn't support generated columns with non-immutable expressions. The current migration uses trigger functions instead of generated columns to avoid this issue.

### Profile Full Name Not Updating

The full_name field is automatically updated when first_name or last_name changes through a database trigger. If it's not working, ensure the `update_profiles_full_name` trigger is properly set up in your database.