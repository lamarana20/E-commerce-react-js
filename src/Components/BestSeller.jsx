import React from "react";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Spinner from "./Spinner";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSeller = products.filter(
      (product) => product.bestseller === true
    );
    setBestSeller(bestSeller);
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="text-gray-500 w-3/4 m-auto text-sm sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </p>
      </div>
      {bestSeller.length === 0 && <Spinner />}
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
    </div>
  );
};

export default BestSeller;
