// /pages/success.js
import React from 'react';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4 text-lg">Thank you for your purchase.</p>
        <a href="/" className="mt-6 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default Success;
