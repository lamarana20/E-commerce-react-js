import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 cursor-pointer">
      <h2 className="text-3xl font-semibold text-center mb-6">About Us</h2>

      <details className="mb-4 border rounded-md p-4 bg-gray-50">
        <summary className="cursor-pointer text-lg font-medium text-gray-700">Who We Are</summary>
        <p className="mt-2 text-sm text-gray-600">
          We are a passionate team dedicated to bringing the best products to our customers with a focus on quality,
          innovation, and customer satisfaction.
        </p>
      </details>

      <details className="mb-4 border rounded-md p-4 bg-gray-50">
        <summary className="cursor-pointer text-lg font-medium text-gray-700">Our Mission</summary>
        <p className="mt-2 text-sm text-gray-600">
          Our mission is to create a seamless shopping experience for our users and to offer products that truly make a difference.
        </p>
      </details>

      <details className="border rounded-md p-4 bg-gray-50">
        <summary className="cursor-pointer text-lg font-medium text-gray-700">Contact Info</summary>
        <p className="mt-2 text-sm text-gray-600">
          You can reach us via the contact form on the Contact page or by email at <span className='text-green-700 '>support@example.com.</span>
          or phone at <span className='text-green-700 '>+1 (123) 456-7890.</span>
          Our office is located at 123 Main Street, City, State, Zip.
          <Link to="/contact" className="text-blue-500 hover:underline">Contact Us</Link>
        </p>
      </details>
    </div>
  );
};

export default About;
