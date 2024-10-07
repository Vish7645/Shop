// app/about/page.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-gray-600 mt-4">Discover who we are and what we stand for.</p>
      </div>

      {/* Our Story Section */}
      <section className="mb-12 w-full md:w-3/4 lg:w-2/3 text-left">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At <strong>My Shop</strong>, we believe fashion is more than just clothes – it’s a way to express yourself. Since our founding in 2023, we’ve grown from a small local boutique to a global online destination for style enthusiasts.
          <br /><br />
          From humble beginnings, our journey has been fueled by our passion for delivering high-quality, affordable, and sustainable fashion to all. Each collection we release is carefully curated to bring the latest trends directly to you.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 w-full md:w-3/4 lg:w-2/3 text-left">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We’re committed to offering stylish, sustainable clothing for everyone. Our goal is to make fashion accessible, empowering individuals through pieces that not only look good but also feel good. We strive to minimize our environmental impact by focusing on eco-friendly materials and ethical production methods.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="mb-12 w-full md:w-3/4 lg:w-2/3">
        <h2 className="text-3xl font-semibold mb-4 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example Team Member 1 */}
          <div className="flex items-center">
            <img
              src="WhatsApp Image 2024-09-08 at 12.15.10 PM.jpeg"
              alt="Team Member 1"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h3 className="text-2xl font-bold">Vishal Kumar</h3>
              <p className="text-gray-600">Lead Developer</p>
              {/* LinkedIn Icon and Link */}
              <a
                href="https://www.linkedin.com/in/vishal-kumar-0233a7223/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 mt-2 hover:text-blue-800"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Example Team Member 2 */}
          <div className="flex items-center">
            <img
              src="pexels-pixabay-45201.jpg"
              alt="Team Member 2"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h3 className="text-2xl font-bold">Ashmita Singh</h3>
              <p className="text-gray-600">Head of Design</p>
              {/* LinkedIn Icon and Link */}
              <a
                href="https://www.linkedin.com/in/janesmith"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 mt-2 hover:text-blue-800"
              >
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Us on the Journey</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explore our latest collections, follow us on social media, and become a part of our ever-growing community. We can’t wait to see you in <strong>My Shop</strong> apparel!
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-500 transition duration-300"
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
};

export default About;
