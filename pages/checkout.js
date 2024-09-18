import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ cart }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });

  useEffect(() => {
    let myTotal = 0;
    for (let index = 0; index < cart.length; index++) {
      myTotal += cart[index][1];
    }
    setSubtotal(myTotal);
  }, [cart]);

  const handlePayment = async () => {
    // Load Stripe.js instance
    const stripe = await stripePromise;
  
    // Format cart for Stripe API
    const formattedCart = cart.map(item => ({
      price_data: {
        currency: 'usd',                  // Assuming USD currency
        product_data: { name: item[0] },  // item[0] is the product name
        unit_amount: item[1] * 100,       // item[1] is the price in dollars, converted to cents
      },
      quantity: 1,  // Set quantity to 1 or adjust based on your case
    }));
  
    try {
      // Create Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: formattedCart }),  // Make sure this object is correctly formatted
      });
  
      // Get session data from the response
      const session = await response.json();
  
      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
  
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  

  return (
    <div>
      <section className="text-black body-font relative">
        <div className="container px-5 py-24 mx-auto min-h-screen">
          <div className="flex flex-col w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Checkout</h1>
            <h2 className="text-2xl font-medium">Cart</h2>
            <div className="cart">{cart.length ? `Your cart details are as follows:` : `Your cart is empty!`}</div>
            <ul className="list-decimal px-8">
              {cart.map((item, index) => (
                <li key={index}>{item[0]} with a price of {item[1]}</li>
              ))}
            </ul>
            <div className="font-bold">Subtotal: {subtotal}</div>
          </div>
          <div className="p-2 w-full">
            <button onClick={handlePayment} className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Pay Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
