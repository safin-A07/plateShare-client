// src/stripe/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// Replace with your **Publishable Key** from Stripe Dashboard
export const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
