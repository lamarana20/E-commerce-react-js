import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Update fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.password_confirmation.trim()) {
      newErrors.password_confirmation = "Password confirmation is required.";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission and API call
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://store-management-backend-main-ehdxlo.laravel.cloud/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      login(data.token);
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleRegister();
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-semibold text-gray-800 text-center">Register your account</h5>

          {/* General error */}
          {errors.general && (
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-800">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-black focus:border-black ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-800">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-black focus:border-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10 focus:ring-black focus:border-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-600"
            >
              {showPassword ? "🚫" : "👁️"}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="password_confirmation" className="block mb-1 text-sm font-medium text-gray-800">Confirm Password</label>
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              id="password_confirmation"
              name="password_confirmation"
              className={`bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10 focus:ring-black focus:border-black ${
                errors.password_confirmation ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              className="absolute right-2 top-9 text-gray-600"
            >
              {showPasswordConfirmation ? "🚫" : "👁️"}
            </button>
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 text-black border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-white bg-black hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Registering..." : "Sign up"}
          </button>

          {/* Redirect */}
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
