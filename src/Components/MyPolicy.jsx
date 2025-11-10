import React from 'react';
import { MdCurrencyExchange, MdHighQuality } from "react-icons/md";
import { FaHeadset } from "react-icons/fa";
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <MdCurrencyExchange className="w-12 h-12 text-blue-600" />, 
    title: "Easy Exchange Policy",
    description: "We offer hassle-free exchanges for your convenience.",
    link: "/exchange-policy",
  },
  {
    icon: <MdHighQuality className="w-12 h-12 text-green-600" />, 
    title: "Top Quality Products",
    description: "Each item is quality-checked to meet our high standards.",
    link: "/quality",
  },
  {
    icon: <FaHeadset className="w-12 h-12 text-purple-600" />, 
    title: "24/7 Customer Support",
    description: "We're always here to assist you at any time.",
    link: "mailto:mamadoulamakalinko628@gmail.com?subject=Customer Support",
  },
];

const MyPolicy = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center"> 
        <h2 className="text-3xl font-bold mb-10">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="p-6 bg-white shadow rounded-lg hover:shadow-xl transition-all duration-300 block hover:bg-gray-50 transform hover:-translate-y-1" // ✅ Ajouté hover lift
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyPolicy;