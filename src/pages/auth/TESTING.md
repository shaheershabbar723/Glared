# Testing Authentication Components

This document provides guidance on how to test the authentication components.

## Manual Testing

### Sign Up Process
1. Navigate to `/auth/signup`
2. Fill in the registration form with:
   - First Name (required)
   - Last Name (optional)
   - Valid email address
   - Password (minimum 6 characters)
   - Confirm Password (must match)
3. Submit the form
4. Check for success message
5. Verify email is sent (in Supabase dashboard)
6. Click confirmation link in email
7. Try to sign in with new credentials

### Sign In Process
1. Navigate to `/auth/signin`
2. Enter valid credentials
3. Submit the form
4. Verify redirection to home page
5. Check that user menu appears in navigation

### Profile Management
1. Sign in to the application
2. Navigate to `/profile`
3. Update profile information
4. Save changes
5. Refresh page and verify changes persist

### Password Reset
1. Navigate to `/auth/signin`
2. Click "Forgot password?" link
3. Enter email address
4. Submit form
5. Check email for reset link
6. Click reset link
7. Enter new password
8. Confirm password
9. Save changes
10. Try signing in with new password

## Automated Testing Setup

To run automated tests, you would need to:

1. Install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

2. Configure Jest in your project

3. Create test files with .test.tsx extension

4. Run tests with:
```bash
npm test
```

## Common Test Scenarios

### Form Validation
- Empty fields should show error messages
- Invalid email formats should be rejected
- Passwords shorter than 6 characters should be rejected
- Non-matching passwords should show error

### Authentication Flow
- Successful sign up should redirect to sign in
- Successful sign in should redirect to home
- Protected routes should redirect to sign in when not authenticated
- Sign out should redirect to home and clear user data

### Error Handling
- Invalid credentials should show appropriate error messages
- Network errors should be handled gracefully
- Duplicate email registration should show error