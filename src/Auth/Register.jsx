import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-toastify"; // ← AJOUTÉ

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // React Hook Form configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  // State for display options
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [checked, setChecked] = useState(false);

  // Watch password field for confirmation validation
  const password = watch("password");

  /**
   * Handle form submission and API request
   */
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      login(data.token);

      // ✅ Toast de succès
      toast.success("Account created successfully! 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      reset(); // Clear the fields
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      // ❌ Toast d'erreur
      toast.error(error.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-2xl font-semibold text-gray-800 text-center">
            Register your account
          </h5>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800">
              Your name
            </label>
            <input
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              placeholder="John Doe"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-black focus:border-black block w-full p-2.5"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
              Your email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="name@example.com"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-black focus:border-black block w-full p-2.5"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="••••••••"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-black focus:border-black block w-full p-2.5 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-10 text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-800">
              Confirm password
            </label>
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              id="password_confirmation"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-black focus:border-black block w-full p-2.5 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              className="absolute right-2 top-10 text-gray-700"
              aria-label={showPasswordConfirmation ? "Hide password" : "Show password"}
            >
              {showPasswordConfirmation ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-start">
            <input
              id="remember"
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 text-black bg-white border-gray-300 rounded focus:ring-black focus:ring-2"
            />
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-800">
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 text-white 
              bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none 
              focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 
                    50 100.591C22.3858 100.591 0 78.2051 0 
                    50.5908C0 22.9766 22.3858 0.59082 50 
                    0.59082C77.6142 0.59082 100 22.9766 
                    100 50.5908ZM9.0816 50.5908C9.0816 
                    73.1865 27.4043 91.5092 50 
                    91.5092C72.5957 91.5092 90.9184 
                    73.1865 90.9184 50.5908C90.9184 
                    27.9951 72.5957 9.67236 50 
                    9.67236C27.4043 9.67236 9.0816 
                    27.9951 9.0816 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 
                    38.4038 97.8624 35.9116 97.0079 
                    33.5539C95.2932 28.8227 92.871 
                    24.3692 89.8167 20.348C85.8452 
                    15.1192 80.8826 10.7238 75.2124 
                    7.41289C69.5422 4.10194 63.2754 
                    1.94025 56.7698 1.05124C51.7666 
                    0.367541 46.6976 0.446843 41.7345 
                    1.27873C39.2611 1.69328 37.813 
                    4.19778 38.4501 6.62326C39.0873 
                    9.04874 41.5694 10.4717 44.0505 
                    10.1071C47.8511 9.54855 51.7191 
                    9.52689 55.5402 10.0491C60.864 
                    10.7766 65.9928 12.5457 70.6331 
                    15.2552C75.2735 17.9648 79.3347 
                    21.5619 82.5849 25.841C84.9175 
                    28.9121 86.7994 32.2913 88.1811 
                    35.8758C89.083 38.2158 91.5421 
                    39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Registering...
              </>
            ) : (
              "Sign up"
            )}
          </button>

          {/* Link to login */}
          <p className="text-sm font-light text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;