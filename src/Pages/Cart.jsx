import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { BiTrash, BiCart } from "react-icons/bi";
import { FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import CartTotal from "../Components/CartTotal";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({
            productId: parseInt(productId),
            size,
            quantity,
          });
        }
      }
    }
    
    setCartData(tempData);
  }, [cartItems]);

  // Calculate item total with safety checks
  const getItemTotal = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.price) return 0;
    
    // Convert to number if it's a string
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price) 
      : product.price;
    
    return price * quantity;
  };

  // Format price safely
  const formatPrice = (price) => {
    if (!price) return '0.00';
    
    const numPrice = typeof price === 'string' 
      ? parseFloat(price) 
      : price;
    
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  // Handle quantity update
  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 0) return;
    updateQuantity(productId, size, newQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page header */}
      <div className="mb-8">
        <Title text1="YOUR" text2="CART" />
        <p className="text-gray-600 text-center mt-2">
          {cartData.length > 0 
            ? `${cartData.length} item${cartData.length !== 1 ? 's' : ''} in your cart`
            : 'Your shopping cart is empty'}
        </p>
      </div>

      {cartData.length === 0 ? (
        // Empty cart state
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <BiCart className="mx-auto h-20 w-20 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <FiShoppingBag className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            {cartData.map((item) => {
              const productData = products.find((p) => p.id === item.productId);
              
              if (!productData) {
                return null;
              }

              const itemTotal = getItemTotal(item.productId, item.quantity);

              return (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <Link 
                      to={`/product/${productData.id}`}
                      className="flex-shrink-0"
                    >
                      {productData.image_urls?.[0] ? (
                        <img
                          src={productData.image_urls[0]}
                          alt={productData.name}
                          width="120"
                          height="120"
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg hover:opacity-90 transition"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <BiCart className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </Link>

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${productData.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition block truncate"
                          >
                            {productData.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            Size: <span className="font-medium text-gray-900">{item.size}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: <span className="font-medium text-gray-900">${formatPrice(productData.price)}</span>
                          </p>
                        </div>

                        {/* Remove button (mobile) */}
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.size, 0)}
                          className="lg:hidden text-red-600 hover:text-red-800 p-2"
                          aria-label="Remove item"
                        >
                          <BiTrash className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity controls and actions */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                handleQuantityChange(item.productId, item.size, value);
                              }
                            }}
                            className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove button (desktop) */}
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.size, 0)}
                          className="hidden lg:flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium transition"
                        >
                          <BiTrash className="w-4 h-4" />
                          Remove
                        </button>

                        {/* Item total */}
                        <div className="ml-auto text-right">
                          <p className="text-xs text-gray-600">Item Total</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>
              
              <CartTotal />

              <button
                onClick={() => navigate("/place-order")}
                disabled={cartData.length === 0}
                className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6 flex items-center justify-center gap-2"
              >
                <FiShoppingBag className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/collection")}
                className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 transition-colors mt-3"
              >
                Continue Shopping
              </button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;