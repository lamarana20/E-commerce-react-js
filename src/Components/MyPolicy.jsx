import React from 'react'
import { MdCurrencyExchange, MdHighQuality } from "react-icons/md"
import { FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <MdCurrencyExchange className="w-10 h-10 m-auto mb-4" />,
    title: "Easy Exchange Policy",
    description: "We offer hassle-free exchanges",
  },
  {
    icon: <MdHighQuality className="w-10 h-10 text-black-600 m-auto mb-4" />,
    title: "Quality Products",
    description: "We guarantee top-notch quality",
  },
  {
    icon: <FaHeadset className="w-10 h-10 m-auto mb-4" />,
    title: "24/7 Support",
    description: "Always available to help you",
    
  },
];

const MyPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 sm:text-sm  text-xs md:text-base text-gray-600 ">
      {features.map((feature, index) => (
        <div key={index}>
          {feature.icon}
          <p className=" font-bold mb-1">{feature.title}</p>
          <p className="text-gray-500 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default MyPolicy
