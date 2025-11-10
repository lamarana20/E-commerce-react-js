import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Spinner from "./Spinner";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const bestProducts = products.filter(
        (product) => product.bestseller === true
      );
      setBestSeller(bestProducts.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        
        {/* View All Button */}
        <Link 
          to="/collection?filter=bestsellers" 
          className="inline-flex items-center gap-2 px-8 py-3 mt-4 text-sm font-bold text-white bg-black rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>View All Bestsellers</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <p className="text-gray-500 w-3/4 m-auto text-sm sm:text-sm md:text-base mt-4">
          Shop our most popular products loved by thousands of customers worldwide.
        </p>
      </div>

      {products.length === 0 ? (
        <Spinner />
      ) : bestSeller.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No bestsellers available at the moment</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image_urls}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;