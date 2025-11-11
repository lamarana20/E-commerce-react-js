import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('🎉 Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.',error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-gray-600 text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Stay informed with exclusive updates, special offers, and early access to new arrivals. 
          Join our community of satisfied customers today.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;