import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const { placeOrder, getCountCart } = useContext(ShopContext);

    const [method, setMethod] = useState("stripe");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Pre-fill with the logged-in user's info
    useEffect(() => {
        if (user) {
            const nameParts = (user.name || "").split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            reset({
                firstName,
                lastName,
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                zip: user.zip || "",
                country: user.country || "",
            });
        }
    }, [user, reset]);

    // Redirect if user is not logged in
    if (!token) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Please login to checkout</h2>
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-black text-white rounded-lg"
                >
                    Login
                </button>
            </div>
        );
    }

    // Redirect if the cart is empty
    if (getCountCart() === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/collection")}
                    className="px-6 py-3 bg-black text-white rounded-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        try {
            await placeOrder(method, formData, token);
            toast.success("Order placed successfully!");
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to place order");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full border px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none";
    const errorClass = "text-red-500 text-xs mt-1";

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* LEFT - Form */}
                <div className="flex-1">
                    <Title text1="Delivery" text2="Information" />

                    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("firstName", { required: "First name is required" })}
                                    placeholder="First Name"
                                    className={inputClass}
                                />
                                {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <input
                                    {...register("lastName", { required: "Last name is required" })}
                                    placeholder="Last Name"
                                    className={inputClass}
                                />
                                {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                className={inputClass}
                            />
                            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                        </div>

                        <input {...register("phone")} placeholder="Phone Number" className={inputClass} />

                        <div>
                            <input
                                {...register("address", { required: "Address is required" })}
                                placeholder="Street Address"
                                className={inputClass}
                            />
                            {errors.address && <p className={errorClass}>{errors.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("city", { required: "City is required" })}
                                    placeholder="City"
                                    className={inputClass}
                                />
                                {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                            </div>
                            <input {...register("state")} placeholder="State" className={inputClass} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("zip", { required: "Zip code is required" })}
                                    placeholder="Zip Code"
                                    className={inputClass}
                                />
                                {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
                            </div>
                            <div>
                                <input
                                    {...register("country", { required: "Country is required" })}
                                    placeholder="Country"
                                    className={inputClass}
                                />
                                {errors.country && <p className={errorClass}>{errors.country.message}</p>}
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex gap-3 text-blue-800 text-sm">
                            <FaShieldAlt className="w-5 h-5 flex-shrink-0" />
                            <span>Your data is protected with secure encryption.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="lg:hidden w-full bg-black text-white py-4 rounded-lg disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Processing..." : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* RIGHT - Summary */}
                <div className="w-full lg:max-w-md space-y-6">
                    
                    <div className="p-6 border rounded-lg shadow-sm bg-white">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <CartTotal />
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm bg-white">
                        <Title text1="Payment" text2="Method" />
                        <div className="space-y-3 mt-4">
                            {["stripe", "credit", "paypal"].map((pm) => (
                                <label
                                    key={pm}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                                        method === pm ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={method === pm}
                                        onChange={() => setMethod(pm)}
                                        className="h-4 w-4"
                                    />
                                    <span className="capitalize">{pm}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={isSubmitting}
                        className="hidden lg:flex w-full bg-black text-white py-4 rounded-lg justify-center items-center gap-2 disabled:bg-gray-400"
                    >
                        <FaLock className="w-4 h-4" />
                        {isSubmitting ? "Processing..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
