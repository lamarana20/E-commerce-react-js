import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await fetch(API_ENDPOINTS.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Stocke token ET user
            login(data.token, data.user);

            toast.success("Welcome back!");
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
                        Login to your account
                    </h5>

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
                            {...register("password", { required: "Password is required" })}
                            placeholder="••••••••"
                            className="w-full border rounded-lg p-2.5 text-sm pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-9 text-gray-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-2.5 rounded-lg disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-black font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;