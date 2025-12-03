import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Spinner from "../Components/Spinner";
import { FaStar, FaRegStar } from "react-icons/fa";
import StarRating from "../Components/StarRating";
import RelatedProduct from "../Components/RelatedProduct";

const Product = () => {
  const { products, addToCart  } = useContext(ShopContext);
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  const [image, setImage] = useState(null);
  const [hasError, setHasError] = useState(false);
  //size selection
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL']);
  const [selectedSize, setSelectedSize] = useState(null);

  // Set image when product is found
  useEffect(() => {
    if (product?.image_urls?.length) {
      setImage(product.image_urls[0]);
    }
    if (product?.sizes) {
      try {
        setSizes(JSON.parse(product.sizes));
      } catch (error) {
        console.error("Error parsing sizes:", error);
      }
    }
  }, [product]);

  // Timeout after 30 seconds if the product is still not found
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!product) {
        setHasError(true);
      }
    }, 15000); // 15 000 ms = 30s

    return () => clearTimeout(timer); // Timer cleanup
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          {!hasError ? (
            <div className="space-y-4">
              <Spinner />
              <p className="text-gray-600 font-medium">Loading product...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-red-500 text-lg font-medium">
                Unable to load the product
              </p>
              <p className="text-gray-500">Please verify your connection or the product ID</p>
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
                onClick={() => (window.location.href = "/")}
              >
                Return to homepage
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100 ease-in">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[30.7%] w-full">
            {product.image_urls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            {image && (
              <img src={image} alt={product.name} className="w-full h-auto " />
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{product.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <StarRating
              onRatingChange={(value) => console.log("Note :", value)}
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-3xl font-medium mt-5">${product.price}</p>
          <p className="text-gray-500 mt-5 md:w-3/4">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 mt-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-full px-4 py-2 transition 
        ${
          selectedSize === size
            ? "bg-black text-white border-black"
            : "border-gray-300"
        }
      `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button  onClick={() => addToCart(productId, selectedSize)} className="bg-black text-white px-6 py-4 rounded-full mt-5 active:bg-gray-500 hover:bg-gray-800 transition duration-300">
            Add to Cart
            </button>
            <hr className="mt-8 sm:w-3/4" />
            {/* Description */}
            <div className="flex flex-col sm:flex-row gap-1 text-gray-500 mt-5">
              <p>100% original this product</p>

            </div>
        </div>
      </div>
      <div className="mt-20"> 
        <div className="flex border-b"> 
          <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:border-b-2 hover:border-black transition-all">Description</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:border-b-2 hover:border-black transition-all">Additional Information</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-black hover:border-b-2 hover:border-black transition-all">Reviews (2)</button>
        </div>
        <div className="flex flex-col gap-4 p-6 mt-5 bg-gray-50 rounded-lg">
          <p className="leading-relaxed text-gray-600">
            Experience unparalleled comfort and style with our meticulously crafted product. Designed with premium materials and attention to detail, this piece seamlessly combines functionality with contemporary aesthetics. The versatile design adapts to your lifestyle, while innovative features enhance your daily experience. Whether for work or leisure, this product delivers exceptional performance and lasting durability. Join countless satisfied customers who have made this their essential companion for modern living.
          </p>
        </div>

      </div>
      {/* display Related Products */}
      <RelatedProduct 
       category_id={product.category_id}
        subcategory={product.sub_category}
         currentId={product.id}
/>
      
      <div >

      </div>
    </div>
  );
};

export default Product;
