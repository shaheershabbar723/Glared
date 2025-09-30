/*
  # Remove Stripe Tables
  This migration removes all Stripe-related tables that are no longer needed.
*/

-- Drop RLS policies first
DROP POLICY IF EXISTS "Users can view own stripe customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Users can insert own stripe customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Service role can manage orders" ON stripe_orders;

-- Drop Stripe-related tables
DROP TABLE IF EXISTS stripe_orders;
DROP TABLE IF EXISTS stripe_subscriptions;
DROP TABLE IF EXISTS stripe_customers;