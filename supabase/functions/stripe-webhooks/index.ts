import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log("Stripe webhook function started")

serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  
  if (!signature || !webhookSecret) {
    console.error('Missing stripe signature or webhook secret')
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  try {
    const body = await request.text()
    const receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    )

    console.log(`🔔 Webhook received: ${receivedEvent.type}`)

    // Initialize Supabase client with service role key
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

    // Handle different webhook events
    switch (receivedEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'customer.subscription.created':
        await handleSubscriptionCreated(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(receivedEvent.data.object, supabaseAdmin)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(receivedEvent.data.object, supabaseAdmin)
        break
        
      default:
        console.log(`Unhandled event type: ${receivedEvent.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Webhook error:', err.message)
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }
})

// Handle checkout session completion
async function handleCheckoutSessionCompleted(session: any, supabase: any) {
  console.log('Processing checkout.session.completed')
  
  try {
    const customerId = session.customer
    const paymentIntentId = session.payment_intent
    const subscriptionId = session.subscription
    
    // If it's a subscription checkout
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      await upsertSubscription(subscription, supabase)
    }
    
    // Create or update order record
    await upsertOrder({
      checkout_session_id: session.id,
      payment_intent_id: paymentIntentId,
      customer_id: customerId,
      amount_subtotal: session.amount_subtotal,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      status: 'completed'
    }, supabase)
    
    console.log('✅ Checkout session completed processing finished')
  } catch (error) {
    console.error('Error handling checkout session:', error)
    throw error
  }
}

// Handle successful payment intent
async function handlePaymentIntentSucceeded(paymentIntent: any, supabase: any) {
  console.log('Processing payment_intent.succeeded')
  
  try {
    const customerId = paymentIntent.customer
    
    // Update order status to completed
    const { error } = await supabase
      .from('stripe_orders')
      .update({ 
        payment_status: 'paid',
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('payment_intent_id', paymentIntent.id)
    
    if (error) {
      console.error('Error updating order:', error)
      throw error
    }
    
    console.log('✅ Payment intent succeeded processing finished')
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
    throw error
  }
}

// Handle failed payment intent
async function handlePaymentIntentFailed(paymentIntent: any, supabase: any) {
  console.log('Processing payment_intent.payment_failed')
  
  try {
    // Update order status to failed
    const { error } = await supabase
      .from('stripe_orders')
      .update({ 
        payment_status: 'failed',
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('payment_intent_id', paymentIntent.id)
    
    if (error) {
      console.error('Error updating failed order:', error)
      throw error
    }
    
    console.log('✅ Payment intent failed processing finished')
  } catch (error) {
    console.error('Error handling payment intent failed:', error)
    throw error
  }
}

// Handle successful invoice payment (for subscriptions)
async function handleInvoicePaymentSucceeded(invoice: any, supabase: any) {
  console.log('Processing invoice.payment_succeeded')
  
  try {
    const subscriptionId = invoice.subscription
    
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      await upsertSubscription(subscription, supabase)
    }
    
    console.log('✅ Invoice payment succeeded processing finished')
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
    throw error
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription: any, supabase: any) {
  console.log('Processing customer.subscription.created')
  
  try {
    await upsertSubscription(subscription, supabase)
    console.log('✅ Subscription created processing finished')
  } catch (error) {
    console.error('Error handling subscription created:', error)
    throw error
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: any, supabase: any) {
  console.log('Processing customer.subscription.updated')
  
  try {
    await upsertSubscription(subscription, supabase)
    console.log('✅ Subscription updated processing finished')
  } catch (error) {
    console.error('Error handling subscription updated:', error)
    throw error
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription: any, supabase: any) {
  console.log('Processing customer.subscription.deleted')
  
  try {
    const { error } = await supabase
      .from('stripe_subscriptions')
      .update({ 
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('subscription_id', subscription.id)
    
    if (error) {
      console.error('Error updating deleted subscription:', error)
      throw error
    }
    
    console.log('✅ Subscription deleted processing finished')
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
    throw error
  }
}

// Helper function to upsert subscription data
async function upsertSubscription(subscription: any, supabase: any) {
  console.log('Upserting subscription:', subscription.id)
  
  try {
    const subscriptionData = {
      customer_id: subscription.customer,
      subscription_id: subscription.id,
      price_id: subscription.items.data[0]?.price.id,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString()
    }
    
    // Get payment method details if available
    if (subscription.default_payment_method) {
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(subscription.default_payment_method)
        if (paymentMethod.card) {
          subscriptionData.payment_method_brand = paymentMethod.card.brand
          subscriptionData.payment_method_last4 = paymentMethod.card.last4
        }
      } catch (error) {
        console.log('Could not retrieve payment method details:', error.message)
      }
    }
    
    const { error } = await supabase
      .from('stripe_subscriptions')
      .upsert(subscriptionData, { 
        onConflict: 'customer_id',
        ignoreDuplicates: false 
      })
    
    if (error) {
      console.error('Error upserting subscription:', error)
      throw error
    }
    
    console.log('✅ Subscription upserted successfully')
  } catch (error) {
    console.error('Error in upsertSubscription:', error)
    throw error
  }
}

// Helper function to upsert order data
async function upsertOrder(orderData: any, supabase: any) {
  console.log('Upserting order:', orderData.checkout_session_id)
  
  try {
    const { error } = await supabase
      .from('stripe_orders')
      .upsert({
        ...orderData,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'checkout_session_id',
        ignoreDuplicates: false 
      })
    
    if (error) {
      console.error('Error upserting order:', error)
      throw error
    }
    
    console.log('✅ Order upserted successfully')
  } catch (error) {
    console.error('Error in upsertOrder:', error)
    throw error
  }
}