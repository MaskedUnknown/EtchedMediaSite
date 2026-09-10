// src/services/stripe.js
import { loadStripe } from '@stripe/stripe-js';
import { isSecureOrigin, logSecurityAudit } from './security';

// ── ⚠️ CRITICAL CONFIGURATION ──
// Replace this with your actual Stripe PUBLISHABLE key (starts with pk_live_ or pk_test_).
// NEVER put your Secret Key (sk_) here!
const STRIPE_PUBLISHABLE_KEY = 'pk_test_replace_with_your_actual_key';

/**
 * Maps your site products to Stripe's hosted Payment Links
 * In a standard setup, you generate these directly in your Stripe Dashboard.
 */
const PRODUCT_PAYMENT_LINKS = {
    PREMIUM_LICENSE: 'https://stripe.com',
    PORTFOLIO_ASSET: 'https://stripe.com',
};

/**
 * Initializes a secure checkout routing session
 * @param {String} productKey - The lookup key identifier for the item
 */
export const executeCheckout = async (productKey) => {
    // 1. Run Client-Side Safety Checks
    if (!isSecureOrigin()) {
        console.error('[Security Exception] Unauthorized checkout execution domain block.');
        alert('Security Alert: Checkout cannot proceed from an unverified domain source.');
        return;
    }

    // 2. Locate the corresponding Stripe Hosted portal address
    const destinationUrl = PRODUCT_PAYMENT_LINKS[productKey];

    if (!destinationUrl) {
        console.error(`[Checkout Error] No checkout mapping found for key: ${productKey}`);
        return;
    }

    // 3. Log a clean audit history trail
    logSecurityAudit(`Redirecting user to safe checkout interface for item: ${productKey}`);

    // 4. Smoothly initialize Stripe core listener and forward the window location
    try {
        const stripeInstance = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        if (stripeInstance) {
            // Forward user safely to the Stripe portal page
            window.location.href = destinationUrl;
        }
    } catch (error) {
        console.error('[Stripe Integration Error]', error);
        alert('Failed to connect to the payment gateway. Please try again.');
    }
};