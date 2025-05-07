import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { FaStripe, FaCreditCard, FaPaypal } from "react-icons/fa";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const { placeOrder, setDeliveryInfo, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlaceOrder = (e) => {
    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    e.preventDefault();
    setDeliveryInfo(formData); // Enregistre les infos de livraison
    placeOrder();
    navigate("/orders");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-6 sm:pt-14 min-h-[80vh] px-4 sm:px-8">
      <div className="w-full sm:max-w-xl">
        <Title text1="Delivery " text2="Information" />
        <form onSubmit={handlePlaceOrder} className="mt-6 space-y-4">
          <div className="flex gap-4">
            <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-4">
            <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input required type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-4">
            <input required type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input required type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          <button type="submit" className="w-full bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
            Place Order
          </button>
        </form>      </div>

      <div className="w-full sm:max-w-sm mt-16 sm:mt-0">
        <div className="text-2xl font-semibold mb-4">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="Payment" text2="Method" />
          <div className="flex flex-col lg:flex-row gap-3 mt-4">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition hover:bg-gray-100 ${
                method === "stripe" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border ${method === "stripe" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}></div>
              <FaStripe className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Pay with Stripe</span>
            </div>

            {/* Credit Card */}
            <div
              onClick={() => setMethod("credit")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition hover:bg-gray-100 ${
                method === "credit" ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border ${method === "credit" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}></div>
              <FaCreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Pay with Credit Card</span>
            </div>
          </div>

          {/* Paypal */}
          <div
            onClick={() => setMethod("paypal")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md mt-4 transition hover:bg-gray-100 ${
              method === "paypal" ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <div className={`w-4 h-4 rounded-full border ${method === "paypal" ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}></div>
            <FaPaypal className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Pay with Paypal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;