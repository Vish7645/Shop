import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ cart }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart visibility
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });

  useEffect(() => {
    let myTotal = 0;
    for (let index = 0; index < cart.length; index++) {
      myTotal += cart[index][1];
    }
    setSubtotal(myTotal);
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle cart visibility
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const formattedCart = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item[0].attributes.title },
        unit_amount: item[1] * 100,
      },
      quantity: 1,
    }));

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: formattedCart }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

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
        <div className="container px-5 py-24 mx-auto min-h-screen flex">
          {/* Left Side: Cart Details */}
          <div className="w-2/3 pr-10">
            <div className="flex flex-col w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Checkout</h1>
              <button onClick={toggleCart} className="bg-indigo-500 text-white px-4 py-2 rounded">View Cart</button>
              <div className="font-bold">Subtotal: ${subtotal}</div>
            </div>
            <div className="p-2 w-full">
              <button onClick={handlePayment} className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Pay Now
              </button>
            </div>
          </div>

          {/* Right Side: Image Column */}
          <div className="w-1/3">
            <h2 className="text-lg font-medium mb-4 text-gray-900">Items in Cart</h2>
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item, index) => (
                <div key={index} className="h-32 w-full overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={`http://localhost:1337${item[0].attributes.image.data.attributes.url}`}
                    alt={item[0].attributes.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Cart */}
      {isCartOpen && (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button onClick={toggleCart} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((item, index) => (
                              <li key={index} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img src={`http://localhost:1337${item[0].attributes.image.data.attributes.url}`} alt={item[0].attributes.title} className="h-full w-full object-cover object-center" />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item[0].attributes.title}</h3>
                                    <p className="ml-4">${item[1]}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty 1</p>
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button onClick={handlePayment} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <Link href="/products">
                            <button className="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping &rarr;</button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
