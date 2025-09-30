/*
  # Stripe Webhook Optimization Migration
  
  1. Add indexes for better webhook performance
  2. Add missing columns for webhook data
  3. Update existing tables to match latest schema
  4. Add proper constraints and triggers
*/

-- Add indexes for better webhook query performance
CREATE INDEX IF NOT EXISTS idx_stripe_customers_customer_id ON stripe_customers(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer_id ON stripe_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_subscription_id ON stripe_subscriptions(subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_checkout_session_id ON stripe_orders(checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_payment_intent_id ON stripe_orders(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_customer_id ON stripe_orders(customer_id);

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to tables that need them
DROP TRIGGER IF EXISTS update_stripe_customers_updated_at ON stripe_customers;
CREATE TRIGGER update_stripe_customers_updated_at
    BEFORE UPDATE ON stripe_customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_subscriptions_updated_at ON stripe_subscriptions;
CREATE TRIGGER update_stripe_subscriptions_updated_at
    BEFORE UPDATE ON stripe_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stripe_orders_updated_at ON stripe_orders;
CREATE TRIGGER update_stripe_orders_updated_at
    BEFORE UPDATE ON stripe_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add webhook events tracking table
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_event_id text NOT NULL UNIQUE,
    event_type text NOT NULL,
    processed_at timestamptz DEFAULT now(),
    data jsonb,
    created_at timestamptz DEFAULT now()
);

-- Add index for webhook events
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_stripe_event_id ON stripe_webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_event_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_processed_at ON stripe_webhook_events(processed_at);

-- Enable RLS on webhook events table
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- Add policy for service role access to webhook events
CREATE POLICY "Service role can manage webhook events"
    ON stripe_webhook_events
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Add some helpful views for subscription management
CREATE OR REPLACE VIEW active_subscriptions AS
SELECT 
    sc.user_id,
    sc.customer_id,
    ss.subscription_id,
    ss.price_id,
    ss.status,
    ss.current_period_start,
    ss.current_period_end,
    ss.cancel_at_period_end,
    ss.payment_method_brand,
    ss.payment_method_last4,
    ss.created_at,
    ss.updated_at
FROM stripe_customers sc
JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
WHERE ss.status IN ('active', 'trialing', 'past_due')
  AND sc.deleted_at IS NULL;

-- Grant access to the view
GRANT SELECT ON active_subscriptions TO authenticated, service_role;

-- Add RLS policy for users to see their own active subscriptions
CREATE POLICY "Users can view their own active subscriptions"
    ON stripe_customers
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() AND deleted_at IS NULL);