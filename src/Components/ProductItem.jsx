import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  
  const imgSrc = image && image.length > 0 ? image[0] : "/path/to/placeholder.jpg";

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-gray-600 text-sm mb-1">${Number(price).toFixed(0)}</p>
    </Link>
  );
};

export default ProductItem;
