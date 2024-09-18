// /pages/cancel.js
import React from 'react';

const Cancel = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Payment Canceled!</h1>
        <p className="mt-4 text-lg">It looks like you canceled the payment process.</p>
        <a href="/checkout" className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200">
          Try Again
        </a>
      </div>
    </div>
  );
};

export default Cancel;
