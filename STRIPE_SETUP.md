# Stripe Integration Setup Guide

This guide will help you set up the complete Stripe integration with Supabase Edge functions for your AI Fashion Photography platform.

## Prerequisites

1. Supabase CLI installed: `npm install -g supabase`
2. Stripe account with test API keys
3. Supabase project set up

## 1. Database Migration

First, apply the webhook optimization migration:

```bash
# Run the migration
supabase db push --project-ref davlauemodhnnuevsaodx
```

## 2. Environment Variables

Set up the following environment variables in your Supabase project:

### In Supabase Dashboard (Settings > Edge Functions)

```
STRIPE_SECRET_KEY=sk_test_51RfTPAQ0yBuab1jS8UfL6TOU1vsMmLU3ynbVMh9CDbMJvclzb9GGpDytXCb9LSjRcJuOQaPwPbLmngYiL9aNhvYS00SwddUwMv
STRIPE_WEBHOOK_SECRET=whsec_g7RDwRQGPFEzbrIOrFA5BXJmKuXxqePi
SUPABASE_URL=https://davlauemodhnnuevsaodx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdmxhdWVtb2RobnVldnNhb2R4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk4MDY4NSwiZXhwIjoyMDc0NTU2Njg1fQ.uMrEV2GJq__AI7G-JBul93msBE0hXjd4mn9JP1z1GJQ
```

## 3. Deploy Edge Functions

### Deploy the webhook handler:
```bash
supabase functions deploy stripe-webhooks --project-ref davlauemodhnnuevsaodx
```

### Deploy the checkout session creator:
```bash
supabase functions deploy create-checkout-session --project-ref davlauemodhnnuevsaodx
```

Or use the provided script:
```bash
# On Windows
.\scripts\deploy-webhook.ps1

# On Unix/Linux/Mac
./scripts/deploy-webhook.sh
```

## 4. Configure Stripe Webhooks

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Add the endpoint URL: `https://davlauemodhnnuevsaodx.supabase.co/functions/v1/stripe-webhooks`
4. Select the following events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret and update your `STRIPE_WEBHOOK_SECRET` environment variable

## 5. Test the Integration

### Frontend Integration

The updated `stripe.ts` file now includes:
- `createCheckoutSession()` - Creates Stripe checkout sessions via Edge function
- `getUserSubscription()` - Gets user's current subscription status
- `getUserOrders()` - Gets user's order history

### Testing Checklist

1. **One-time Payments**: Test picture packages (5, 10, 20 pictures)
2. **Subscriptions**: Test service packages (Essential, Signature, Couture)
3. **Webhooks**: Verify that successful payments update the database
4. **User Authentication**: Ensure only authenticated users can make purchases

### Test Flow

1. User clicks on a pricing option
2. `createCheckoutSession()` is called
3. Edge function creates Stripe customer (if needed) and checkout session
4. User is redirected to Stripe checkout
5. After payment, Stripe sends webhook to your Edge function
6. Edge function updates subscription/order status in database
7. User is redirected to success page

## 6. Database Tables

The integration uses these tables:

- `stripe_customers` - Links Supabase users to Stripe customers
- `stripe_subscriptions` - Tracks subscription data and status
- `stripe_orders` - Stores one-time payment information
- `stripe_webhook_events` - Logs webhook processing
- `active_subscriptions` - View for active user subscriptions

## 7. Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Service role has full access for webhook processing
- JWT verification disabled for webhook endpoints
- Webhook signature verification for security

## 8. Monitoring and Debugging

### Check Edge Function Logs
```bash
supabase functions logs stripe-webhooks --project-ref davlauemodhnnuevsaodx
supabase functions logs create-checkout-session --project-ref davlauemodhnnuevsaodx
```

### Database Queries for Debugging
```sql
-- Check webhook events
SELECT * FROM stripe_webhook_events ORDER BY created_at DESC LIMIT 10;

-- Check user subscriptions
SELECT * FROM active_subscriptions;

-- Check recent orders
SELECT * FROM stripe_orders ORDER BY created_at DESC LIMIT 10;
```

## 9. Production Considerations

1. **Replace test keys** with production Stripe keys
2. **Update webhook URLs** to production endpoints
3. **Monitor webhook delivery** in Stripe dashboard
4. **Set up error alerting** for failed webhook processing
5. **Regular database backups** for financial data

## 10. Troubleshooting

### Common Issues

1. **"Function not found"**: Ensure Edge functions are deployed
2. **"Webhook signature verification failed"**: Check webhook secret
3. **"User not found"**: Ensure user is authenticated before checkout
4. **"Database connection failed"**: Verify Supabase credentials

### Debug Steps

1. Check Edge function logs
2. Verify environment variables
3. Test webhook delivery in Stripe dashboard
4. Check database permissions and RLS policies

## 11. Next Steps

After setup is complete, you can:

1. **Customize pricing plans** in `stripe.ts`
2. **Add more webhook events** as needed
3. **Implement subscription management** UI
4. **Add usage tracking** for subscription limits
5. **Set up automated billing** notifications

## Support

If you encounter issues:
1. Check the Supabase Edge function logs
2. Verify all environment variables are set correctly
3. Test webhooks using Stripe CLI: `stripe listen --forward-to localhost:54321/functions/v1/stripe-webhooks`