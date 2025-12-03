import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (formData) => {
        try {
            const response = await fetch(API_ENDPOINTS.register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            login(data.token, data.user);

            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white p-4">
            <div className="w-full max-w-sm p-6 bg-white border rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h5 className="text-2xl font-semibold text-center">
                        Create an account
                    </h5>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Your name"
                            className="w-full border rounded-lg p-2.5 text-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="name@example.com"
                            className="w-full border rounded-lg p-2.5 text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Min 8 characters" },
                            })}
                            placeholder="••••••••"
                            className="w-full border rounded-lg p-2.5 pr-10 text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-9 text-xs font-medium text-gray-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium">Confirm Password</label>
                        <input
                            type={showPasswordConfirmation ? "text" : "password"}
                            {...register("password_confirmation", {
                                required: "Please confirm password",
                                validate: (value) => value === password || "Passwords don't match",
                            })}
                            placeholder="••••••••"
                            className="w-full border rounded-lg p-2.5 pr-10 text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                            className="absolute right-3 top-9 text-xs font-medium text-gray-600"
                        >
                            {showPasswordConfirmation ? "Hide" : "Show"}
                        </button>
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-2.5 rounded-lg disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Creating..." : "Create Account"}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-black font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
