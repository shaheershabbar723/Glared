/*
  # Remove Stripe Webhook Events Table
  This migration removes the stripe_webhook_events table and related views.
*/

-- Drop policies first
DROP POLICY IF EXISTS "Service role can manage webhook events" ON stripe_webhook_events;
DROP POLICY IF EXISTS "Users can view their own active subscriptions" ON stripe_customers;

-- Drop views
DROP VIEW IF EXISTS active_subscriptions;

-- Drop indexes
DROP INDEX IF EXISTS idx_stripe_webhook_events_stripe_event_id;
DROP INDEX IF EXISTS idx_stripe_webhook_events_event_type;
DROP INDEX IF EXISTS idx_stripe_webhook_events_processed_at;

-- Disable RLS on webhook events table
ALTER TABLE stripe_webhook_events DISABLE ROW LEVEL SECURITY;

-- Drop webhook events table
DROP TABLE IF EXISTS stripe_webhook_events;

-- Drop updated_at triggers
DROP TRIGGER IF EXISTS update_stripe_customers_updated_at ON stripe_customers;
DROP TRIGGER IF EXISTS update_stripe_subscriptions_updated_at ON stripe_subscriptions;
DROP TRIGGER IF EXISTS update_stripe_orders_updated_at ON stripe_orders;

-- Drop the function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Revoke access to the view
REVOKE SELECT ON active_subscriptions FROM authenticated, service_role;