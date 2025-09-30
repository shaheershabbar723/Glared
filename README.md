# Glared - AI Fashion Photography Platform

A modern web application for AI-generated fashion photography services built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Portfolio Management**: Dynamic categories and clothing items with image galleries
- **Admin Dashboard**: Full CRUD operations for managing portfolio content
- **User Authentication**: Complete sign up, sign in, and profile management
- **Stripe Integration**: Payment processing for photography packages
- **Responsive Design**: Mobile-first approach with modern UI/UX

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Payments**: Stripe
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd glared-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the database migrations (they should auto-apply)
   - Set up authentication if needed

5. Set up Stripe:
   - Create a Stripe account
   - Get your publishable key from the Stripe dashboard
   - Add it to your `.env` file

6. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components
│   ├── Layout/         # Navigation, Footer
│   ├── Portfolio/      # Portfolio display components
│   └── ui/             # Basic UI components
├── contexts/           # React contexts (Auth)
├── lib/               # Utilities and configurations
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   └── admin/         # Admin pages
└── styles/            # Global styles

supabase/
├── migrations/        # Database schema migrations
└── functions/         # Supabase Edge functions
```

## Key Features

### Portfolio Management
- Dynamic categories (Men's/Women's collections)
- Clothing items with multiple images
- Image hover effects and carousels
- Responsive grid layouts

### User Authentication
- Email/password sign up and sign in
- User profile management
- Password reset functionality
- Protected routes for authenticated users
- Responsive authentication forms

### Admin Dashboard
- Secure authentication
- Category management (CRUD operations)
- Clothing item management with image uploads
- File upload to Supabase Storage

### Stripe Integration
- Multiple pricing tiers
- One-time and subscription packages
- Secure payment processing
- Demo mode for development

### Responsive Design
- Mobile-first approach
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Professional color scheme

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | Yes |

## Database Schema

The application uses the following main tables:
- `categories` - Portfolio categories (men/women sections)
- `clothing_items` - Individual clothing pieces
- `clothing_images` - Multiple images per clothing item
- `profiles` - User profile information
- `stripe_customers` - Stripe customer mappings
- `stripe_subscriptions` - Subscription tracking
- `stripe_orders` - Order history

## Authentication System

The authentication system includes:
- Sign up with email and password
- Sign in with email and password
- User profile management
- Password reset functionality
- Protected routes for authenticated users only

To set up authentication:
1. Run the auth migration: `supabase/migrations/20250928100000_auth_tables.sql`
2. Configure Supabase Auth settings in your dashboard
3. Set up email templates for password reset emails

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

3. Set up environment variables in your hosting platform

4. Configure Stripe webhooks if using real payments

## Development

### Adding New Features
1. Create components in the appropriate directory
2. Add routes in `App.tsx`
3. Update navigation if needed
4. Add database migrations if required

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the existing color scheme (black, white, yellow accents)
- Maintain responsive design principles
- Use consistent spacing and typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.