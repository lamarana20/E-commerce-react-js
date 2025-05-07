import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { BiTrash,BiCart } from "react-icons/bi";
import CartTotal from "../Components/CartTotal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems,updateQuntity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({
            productId,
            size,
            quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 flex items-center justify-center gap-2">Your cart is empty <BiCart />
       <button 
       className="text-blue-500 hover:underline"
       onClick={() => navigate("/")}
       >
        Go to Shop
        </button>
        </p>
        
      ) : (
        cartData.map((item) => {
          const productData = products.find(
            (p) => p.id === parseInt(item.productId)
          );
          if (!productData) return null;

          const itemTotal = productData.price * item.quantity;

          return (
            <div
              key={`${item.productId}-${item.size}`}
              className="py-4 border-t border-b text-gray-500 grid grid-cols-[4fr_1fr_1fr_1fr] sm:grid-cols-[4fr_1fr_1fr_1fr] md:grid-cols-[4fr_1fr_1fr_1fr] lg:grid-cols-[4fr_1fr_1fr_1fr]"
            >
              <div className="flex items-start gap-6">
                <Link to={`/product/${productData.id}`} className="flex items-center gap-2">
                <img
                  src={productData.image_urls?.[0]}
                  alt={productData.name}
                  className="w-20 h-20 object-cover rounded-lg sm:w-20"
                />
                </Link>
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 bg-slate-50 border">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e)=>e.target.value === "" || e.target.value === "0" ? null :updateQuntity(item.productId, item.size, Number(e.target.value))}
                className="w-16 sm:w-20 px-2 py-1 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <BiTrash className="w-4 sm:w-5 cursor-pointer mt-6 hover:text-red-500" onClick={() => updateQuntity(item.productId, item.size, 0)} />

              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold">${itemTotal.toFixed()}</p>
              </div>
            </div>
          );
        })
      )}
      <div className="flex justify-end my-20"> 
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button  onClick={()=>navigate('/place-order')}   className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer rounded-full hover:bg-gray-800 transition-colors duration-300">
             Place Order
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;