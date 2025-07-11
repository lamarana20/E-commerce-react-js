import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/images/logo.png";

const ProductItem = ({ id, name, price, image, badge }) => {
  const imgSrc = image && image.length > 0 ? image[0] : placeholder;

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer relative block hover:text-gray-900 transition"
      aria-label={`View details for ${name}`}
    >
      <div className="overflow-hidden relative">
        {badge && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
            {badge}
          </span>
        )}
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-40 sm:h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <p className="pt-3 pb-1 text-sm truncate">{name}</p>
      <p className="text-gray-600 text-sm mb-1">${Number(price).toFixed(0)}</p>
    </Link>
  );
};

export default ProductItem;
