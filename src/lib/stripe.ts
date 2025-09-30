import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Stripe functionality will be disabled.');
}

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Simplified product configurations for demo purposes
export const products = {
  // Picture packages
  pictures_5: {
    name: '5 Pictures',
    description: 'Professional AI fashion photography package with 5 high-quality images',
    price: 500, // $5.00 in cents
    currency: 'usd',
    features: [
      '5 high-resolution images',
      '24-48 hour delivery',
      'Basic AI styling',
      '1 revision included'
    ]
  },
  pictures_10: {
    name: '10 Pictures',
    description: 'Professional AI fashion photography package with 10 high-quality images',
    price: 900, // $9.00 in cents
    currency: 'usd',
    features: [
      '10 high-resolution images',
      '24-48 hour delivery',
      'Advanced AI styling',
      '2 revisions included'
    ]
  },
  pictures_20: {
    name: '20 Pictures',
    description: 'Professional AI fashion photography package with 20 high-quality images',
    price: 1600, // $16.00 in cents
    currency: 'usd',
    features: [
      '20 high-resolution images',
      '24-48 hour delivery',
      'Premium AI styling',
      '3 revisions included'
    ]
  },
  
  // Service packages
  essential_pack: {
    name: 'Essential Pack',
    description: 'Basic AI fashion photography service perfect for getting started',
    price: 3000, // $30.00 in cents
    currency: 'usd',
    period: 'monthly',
    features: [
      'Basic AI fashion photography',
      'Standard model selection',
      'Up to 3 revisions',
      '48-hour delivery',
      'High-resolution images',
      'Monthly subscription'
    ]
  },
  signature_pack: {
    name: 'Signature Pack',
    description: 'Professional AI fashion photography service with advanced styling options',
    price: 10000, // $100.00 in cents
    currency: 'usd',
    period: 'monthly',
    features: [
      'Professional AI fashion photography',
      'Premium model selection',
      'Advanced styling options',
      'Up to 5 revisions',
      '24-hour delivery',
      'Ultra high-resolution images',
      'Priority support',
      'Monthly subscription'
    ]
  },
  couture_pack: {
    name: 'Couture Pack',
    description: 'Premium AI fashion photography service with bespoke styling and unlimited revisions',
    price: 30000, // $300.00 in cents
    currency: 'usd',
    period: 'monthly',
    features: [
      'Bespoke AI fashion photography',
      'Custom model creation',
      'Unlimited styling options',
      'Unlimited revisions',
      '12-hour delivery',
      'Ultra high-resolution images',
      'Dedicated account manager',
      'Custom backgrounds & settings',
      'Monthly subscription'
    ]
  }
};

export type ProductKey = keyof typeof products;

// Helper function to format price for display
export const formatPrice = (priceInCents: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(priceInCents / 100);
};

// Create Stripe checkout session with proper backend integration
export const createCheckoutSession = async (productKey: ProductKey) => {
  const product = products[productKey];
  
  if (!stripePromise) {
    throw new Error('Stripe is not configured. Please add your Stripe publishable key to the environment variables.');
  }

  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('You must be logged in to make a purchase');
    }

    // Create checkout session via Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        productKey,
        product,
        userId: user.id,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }

    if (data?.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Demo checkout function for development
export const createDemoCheckoutSession = async (productKey: ProductKey) => {
  const product = products[productKey];
  
  if (!stripePromise) {
    throw new Error('Stripe is not configured. Please add your Stripe publishable key to the environment variables.');
  }

  // For demo purposes, we'll show an alert with the product details
  const message = `
Demo Mode: Stripe Checkout

Product: ${product.name}
Price: ${formatPrice(product.price)}
Description: ${product.description}

In a real implementation, this would redirect to Stripe checkout.
For now, redirecting to success page to demonstrate the flow.
  `;
  
  alert(message);
  
  // Simulate successful checkout by redirecting to success page
  window.location.href = '/success?session_id=demo_session_' + Date.now();
};

// Get user's subscription status
export const getUserSubscription = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from('active_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
};

// Get user's order history
export const getUserOrders = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return [];
    }

    const { data, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};