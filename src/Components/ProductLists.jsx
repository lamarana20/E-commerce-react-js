import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'; // ajuste le chemin si besoin
import Spinner from './Spinner';

const ProductLists = () => {
  const { products, loading } = useContext(ShopContext);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-5">Product Lists</h1>
      {loading ? (
        <div className="flex justify-center items-center ">
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-gray-500">No products available.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 mr-1.5 mt-2.5 lg:grid-cols-5">
          {products.map((product) => (
            <li key={product.sku} className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 p-4">
              <img
                src={product.image_url || "https://via.placeholder.com/300x200?text=Image"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-1">${Number(product.price).toFixed(2)}</p>

              <p className="text-gray-600 text-sm mb-1">{product.category}</p>
              <p className={`text-sm ${product.stock_quantity < 10 ? "text-red-500" : "text-green-500"} mt-1`}>
                Stock: {product.stock_quantity}
              </p>
              <p className="text-gray-600 text-sm mb-1">SKU: {product.sku}</p>
              
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">{product.description}</p>

              <div className="mt-4">
                {product.stock_quantity > 0 ? (
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full">
                    Ajouter au panier
                  </button>
                ) : (
                  <button className="bg-gray-400 text-white px-4 py-2 rounded w-full cursor-not-allowed" disabled>
                    En rupture
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductLists;
