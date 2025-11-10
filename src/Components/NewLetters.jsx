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
      toast.success('🎉 Successfully subscribed!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed.',error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-800 via-gray-800 to-[#414141] text-white">
      <div className="max-w-3xl mx-auto text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Subscribe & Get 20% OFF
        </h2>

        <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
          Join our community for exclusive deals, style tips, and early access to new collections.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 disabled:bg-gray-600 disabled:text-white transition-all transform hover:scale-105"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            No spam. Unsubscribe anytime. 🔒
          </p>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;