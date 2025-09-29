# Stripe Webhook Edge Function Deployment Script (PowerShell)
# This script deploys the Stripe webhook handler to Supabase

Write-Host "🚀 Deploying Stripe Webhook Edge Function to Supabase..." -ForegroundColor Green

# Check if Supabase CLI is installed
if (!(Get-Command "supabase" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Check if we're logged in to Supabase
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Supabase. Please run:" -ForegroundColor Red
    Write-Host "supabase login" -ForegroundColor Yellow
    exit 1
}

# Deploy the Edge function
Write-Host "📦 Deploying stripe-webhooks function..." -ForegroundColor Blue
supabase functions deploy stripe-webhooks --project-ref davlauemodhnnuevsaodx

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Function deployed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Your webhook URL is:" -ForegroundColor Cyan
    Write-Host "https://davlauemodhnnuevsaodx.supabase.co/functions/v1/stripe-webhooks" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Add this URL to your Stripe webhook endpoints" -ForegroundColor White
    Write-Host "2. Configure the following events in Stripe:" -ForegroundColor White
    Write-Host "   - checkout.session.completed" -ForegroundColor Gray
    Write-Host "   - payment_intent.succeeded" -ForegroundColor Gray
    Write-Host "   - payment_intent.payment_failed" -ForegroundColor Gray
    Write-Host "   - invoice.payment_succeeded" -ForegroundColor Gray
    Write-Host "   - customer.subscription.created" -ForegroundColor Gray
    Write-Host "   - customer.subscription.updated" -ForegroundColor Gray
    Write-Host "   - customer.subscription.deleted" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Make sure your environment variables are set in Supabase:" -ForegroundColor White
    Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
    Write-Host "   - STRIPE_WEBHOOK_SECRET" -ForegroundColor Gray
    Write-Host "   - SUPABASE_URL" -ForegroundColor Gray
    Write-Host "   - SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Gray
} else {
    Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}