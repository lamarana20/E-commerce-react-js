import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Spinner from "./Spinner";

const LatestCollection = () => {

  const { products } = useContext(ShopContext);


  const [latestProducts, setLatestProducts] = useState([]);

  // Filter and set the first 10 products when products array changes
  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">

      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTION"} />


        <Link
          to="/collection"
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-gray-800 uppercase tracking-wider hover:gap-3 transition-all"
        >
          <span>View All</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>


        <p className="text-gray-500 w-3/4 m-auto text-sm sm:text-sm md:text-base">
          Discover our latest arrivals: fresh styles and top-quality products for every occasion.
        </p>
      </div>

      {/* Products rendering with loading state */}
      {products.length === 0 ? (
        // Show spinner while loading products
        <Spinner />
      ) : latestProducts.length === 0 ? (

        <p className="text-center text-gray-500">No products available</p>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((product) => (
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

export default LatestCollection;