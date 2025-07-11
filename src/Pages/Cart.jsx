import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { BiTrash, BiCart } from "react-icons/bi";
import CartTotal from "../Components/CartTotal";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, updateQuntity } = useContext(ShopContext);
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
    <div className="border-t pt-14 px-4">
      <div className="text-2xl mb-6 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2 mt-10">
          Your cart is empty <BiCart size={24} />
          <button
            className="text-blue-500 hover:underline mt-2 sm:mt-0"
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
              className="border rounded-lg p-4 mb-6 flex gap-4 flex-col sm:flex-row"
            >
              {/* Product image */}
              <Link to={`/product/${productData.id}`}>
                <img
                  src={productData.image_urls?.[0]}
                  alt={productData.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </Link>

              {/* Product details */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {productData.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: <span className="font-medium">${productData.price}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      className="px-2 py-1 text-sm"
                      onClick={() =>
                        updateQuntity(item.productId, item.size, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuntity(item.productId, item.size, Number(e.target.value))
                      }
                      className="w-12 text-center border-x text-sm"
                    />
                    <button
                      className="px-2 py-1 text-sm"
                      onClick={() =>
                        updateQuntity(item.productId, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => updateQuntity(item.productId, item.size, 0)}
                    className="text-red-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <BiTrash /> Remove
                  </button>

                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-700">
                      Total:{" "}
                      <span className="font-semibold">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Cart total */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-10">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
            <button
  onClick={() => navigate("/place-order")}
  disabled={cartData.length === 0}
  className={`w-full sm:w-auto text-sm my-8 px-6 py-3 rounded-full transition-colors duration-300 ${
    cartData.length === 0
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-black text-white hover:bg-gray-800"
  }`}
>
  Place Order
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
