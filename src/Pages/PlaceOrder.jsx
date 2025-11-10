import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { FaStripe, FaCreditCard, FaPaypal, FaLock, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { placeOrder, setDeliveryInfo, cartItems, getCartAmount } = useContext(ShopContext);
  
  const [method, setMethod] = useState("stripe");
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

  // Validation rules
  const validationRules = {
    firstName: { required: true, message: "First name is required" },
    lastName: { required: true, message: "Last name is required" },
    email: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Valid email is required" 
    },
    phone: { 
      required: true,
      pattern: /^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      message: "Valid phone number is required" 
    },
    address: { required: true, message: "Address is required" },
    city: { required: true, message: "City is required" },
    state: { required: true, message: "State is required" },
    zip: { required: true, message: "Zip code is required" },
    country: { required: true, message: "Country is required" },
  };

  // Safe price formatting
  const formatPrice = (price) => {
    if (!price) return '0.00';
    
    const numPrice = typeof price === 'string' 
      ? parseFloat(price) 
      : price;
    
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = formData[field];
      
      if (rules.required && !value.trim()) {
        newErrors[field] = rules.message;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validate cart
    if (!cartItems || Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      setDeliveryInfo(formData);
      await placeOrder(method);
      
      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment methods
  const paymentMethods = [
    { 
      id: "stripe", 
      icon: <FaStripe className="w-6 h-6" />, 
      label: "Stripe",
      color: "text-purple-600"
    },
    { 
      id: "credit", 
      icon: <FaCreditCard className="w-6 h-6" />, 
      label: "Credit Card",
      color: "text-blue-600"
    },
    { 
      id: "paypal", 
      icon: <FaPaypal className="w-6 h-6" />, 
      label: "PayPal",
      color: "text-blue-500"
    },
  ];

  // Form input component
  const FormInput = ({ name, type = "text", placeholder, className = "" }) => (
    <div className={className}>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
          errors[name] 
            ? "border-red-500 focus:ring-red-200" 
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side - Delivery Form */}
        <div className="flex-1 lg:max-w-2xl">
          <div className="mb-6">
            <Title text1="Delivery" text2="Information" />
            <p className="text-gray-600 mt-2">
              Please provide your delivery details
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="firstName" placeholder="First Name" />
              <FormInput name="lastName" placeholder="Last Name" />
            </div>

            {/* Contact fields */}
            <FormInput name="email" type="email" placeholder="Email Address" />
            <FormInput name="phone" type="tel" placeholder="Phone Number" />

            {/* Address */}
            <FormInput name="address" placeholder="Street Address" />

            {/* City and State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="city" placeholder="City" />
              <FormInput name="state" placeholder="State/Province" />
            </div>

            {/* Zip and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="zip" placeholder="Zip/Postal Code" />
              <FormInput name="country" placeholder="Country" />
            </div>

            {/* Security notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <FaShieldAlt className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Secure Checkout</p>
                <p className="text-blue-700">
                  Your information is encrypted and protected with industry-standard security.
                </p>
              </div>
            </div>

            {/* Mobile submit button */}
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(cartItems).length === 0}
              className="w-full lg:hidden bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaLock />
                  Place Order Securely
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="flex-1 lg:max-w-md">
          <div className="sticky top-4 space-y-6">
            
            {/* Order Summary Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <CartTotal />
            </div>

            {/* Payment Method Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <Title text1="Payment" text2="Method" />
              <div className="mt-4 space-y-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setMethod(pm.id)}
                    className={`w-full flex items-center gap-3 border-2 p-4 rounded-lg transition ${
                      method === pm.id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {/* Radio button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        method === pm.id
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {method === pm.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>

                    {/* Icon */}
                    <span className={pm.color}>{pm.icon}</span>

                    {/* Label */}
                    <span className="font-medium text-gray-900">{pm.label}</span>

                    {/* Selected badge */}
                    {method === pm.id && (
                      <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop submit button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || Object.keys(cartItems).length === 0}
              className="hidden lg:flex w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaLock />
                  Place Order Securely
                </>
              )}
            </button>

            {/* Privacy notice */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
              <p>
                Your personal data will be used to process your order, support your experience, 
                and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;