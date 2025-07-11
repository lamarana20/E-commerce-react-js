import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { FaStripe, FaCreditCard, FaPaypal, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const { placeOrder, setDeliveryInfo, cartItems, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Valid email is required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Valid phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "Zip code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!cartItems || Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      setIsSubmitting(false);
      return;
    }

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      setDeliveryInfo(formData);
      await placeOrder(method);
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: "stripe", icon: <FaStripe className="h-5 w-5 text-blue-600" />, label: "Pay with Stripe" },
    { id: "credit", icon: <FaCreditCard className="h-5 w-5 text-blue-600" />, label: "Pay with Credit Card" },
    { id: "paypal", icon: <FaPaypal className="h-5 w-5 text-blue-600" />, label: "Pay with PayPal" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 pt-6 sm:pt-14 min-h-[80vh] px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Delivery Information Form */}
      <div className="w-full lg:w-1/2">
        <Title text1="Delivery " text2="Information" />
        <form onSubmit={handlePlaceOrder} className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.firstName ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastName ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State/Province"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.state ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip/Postal Code"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.zip ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.country ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
                }`}
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-500"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || Object.keys(cartItems).length === 0}
            className={`w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <FaLock className="mr-2" /> Place Order Securely
              </>
            )}
          </button>
        </form>
      </div>

      {/* Order Summary and Payment */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <div className="sticky top-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <CartTotal />
            
            <div className="mt-8">
              <Title text1="Payment" text2="Method" />
              <div className="mt-4 space-y-3">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setMethod(pm.id)}
                    className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition ${
                      method === pm.id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        method === pm.id
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {method === pm.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    {pm.icon}
                    <span className="text-sm font-medium">{pm.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold mb-2">Order Total</h4>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getCartAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Your personal data will be used to process your order and support your experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;