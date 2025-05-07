import React, { useEffect, useContext, useState } from "react";

import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Spinner from "./Spinner";
const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestproducts, setLatestProducts] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <span className="inline-block text-2xl"><a href="/collection">see more</a></span>
        <p className="text-gray-500 w-3/4 m-auto text-sm sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.

        </p>


      </div>
      {/* products renderien*/}
      {latestproducts.length === 0 && <Spinner />}
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image_urls}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
