import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewLetters = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Submitted: ${email}`);
    setEmail(''); // reset champ
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-600">Subscribe now & get 20% off</p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center mx-auto gap-4 my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-black text-white px-10 py-4 text-xs">Subscribe</button>
      </form>
    </div>
  );
};

export default NewLetters;
