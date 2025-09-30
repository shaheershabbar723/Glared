import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

console.log("Create checkout session function started")

serve(async (request) => {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { productKey, product, userId, successUrl, cancelUrl } = await request.json()

    if (!productKey || !product || !userId) {
      return new Response('Missing required parameters', { status: 400 })
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get or create Stripe customer
    let stripeCustomer
    
    // Check if customer already exists
    const { data: existingCustomer } = await supabaseAdmin
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', userId)
      .single()

    if (existingCustomer) {
      stripeCustomer = await stripe.customers.retrieve(existingCustomer.customer_id)
    } else {
      // Get user email from auth
      const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId)
      if (userError || !user) {
        throw new Error('User not found')
      }

      // Create new Stripe customer
      stripeCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: userId
        }
      })

      // Store customer mapping
      await supabaseAdmin
        .from('stripe_customers')
        .insert({
          user_id: userId,
          customer_id: stripeCustomer.id
        })
    }

    // Determine if this is a subscription or one-time payment
    const isSubscription = product.period !== undefined

    let sessionConfig = {
      customer: stripeCustomer.id,
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId,
        product_key: productKey
      }
    }

    if (isSubscription) {
      // For subscriptions, create a price if needed or use existing
      let priceId = `price_${productKey}`
      
      try {
        await stripe.prices.retrieve(priceId)
      } catch (error) {
        // Price doesn't exist, create it
        const priceData = await stripe.prices.create({
          unit_amount: product.price,
          currency: product.currency,
          recurring: { interval: 'month' },
          product_data: {
            name: product.name,
            description: product.description
          },
          metadata: {
            product_key: productKey
          }
        })
        priceId = priceData.id
      }

      sessionConfig.line_items = [
        {
          price: priceId,
          quantity: 1
        }
      ]
    } else {
      // One-time payment
      sessionConfig.line_items = [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description
            },
            unit_amount: product.price
          },
          quantity: 1
        }
      ]
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig)

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})