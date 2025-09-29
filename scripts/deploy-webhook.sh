#!/bin/bash

# Stripe Webhook Edge Function Deployment Script
# This script deploys the Stripe webhook handler to Supabase

echo "🚀 Deploying Stripe Webhook Edge Function to Supabase..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Check if we're logged in to Supabase
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please run:"
    echo "supabase login"
    exit 1
fi

# Deploy the Edge function
echo "📦 Deploying stripe-webhooks function..."
supabase functions deploy stripe-webhooks --project-ref davlauemodhnnuevsaodx

if [ $? -eq 0 ]; then
    echo "✅ Function deployed successfully!"
    echo ""
    echo "🔗 Your webhook URL is:"
    echo "https://davlauemodhnnuevsaodx.supabase.co/functions/v1/stripe-webhooks"
    echo ""
    echo "📋 Next steps:"
    echo "1. Add this URL to your Stripe webhook endpoints"
    echo "2. Configure the following events in Stripe:"
    echo "   - checkout.session.completed"
    echo "   - payment_intent.succeeded"
    echo "   - payment_intent.payment_failed"
    echo "   - invoice.payment_succeeded"
    echo "   - customer.subscription.created"
    echo "   - customer.subscription.updated"
    echo "   - customer.subscription.deleted"
    echo ""
    echo "3. Make sure your environment variables are set:"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi