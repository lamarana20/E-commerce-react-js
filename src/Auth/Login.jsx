import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

/**
 * Login component for user authentication
 * Handles user login with email and password
 * Includes form validation and error handling
 * @returns {JSX.Element} Login form interface
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State management for form inputs and UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  /**
   * Validates form inputs before submission
   * @returns {boolean} True if validation passes, false otherwise
   */
  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  /**
   * Handles the login API request
   * Manages loading state and error handling
   */
  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        "https://store-management-backend-main-ehdxlo.laravel.cloud/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            remember: checked,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      login(data.token);

      setSuccessMessage("Welcome back!");
      setTimeout(() => navigate("/"), 1000); // redirection après 1 sec
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Success and Error Messages */}
        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 border border-green-300 px-4 py-2 rounded text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-semibold text-gray-800 text-center">
            Login to your account
          </h5>

          {/* Email input field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-black focus:border-black block w-full p-2.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input field with toggle visibility */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">
              Your password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-black focus:border-black block w-full p-2.5 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-700"
            >
              {showPassword ? "🚫" : "👁️"}
            </button>
          </div>

          {/* Remember me checkbox */}
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

          {/* Submit button with loading state */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-white 
            bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none 
            focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                      100.591C22.3858 100.591 0 78.2051 0 
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
                    d="M93.9676 39.0409C96.393 38.4038 
                      97.8624 35.9116 97.0079 
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
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Registration link */}
          <p className="text-sm font-light text-gray-600 text-center">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-medium text-black hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
