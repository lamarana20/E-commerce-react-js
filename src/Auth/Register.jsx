import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const HandleRegister = async () => {
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
          body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation,
            remember: checked,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      toast.success("Registration successful", { autoClose: 2000 });
      navigate("/");
      return data;
    } catch (error) {
      toast.error("Error while registering. Please check your credentials", {
        autoClose: 3000,
      });
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    HandleRegister();
  };

  return (
    <>
      {/* Main login container */}
    <div className="flex justify-center items-center sm:mt20 lg:mt-25 mt-15">
          <div className="w-full max-w-sm p-4 bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-9 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handlesubmit}>
            {/* Form title */}
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center mt-2">
              Register to your account
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email input field */}

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password input field with show/hide toggle */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-600 dark:text-gray-300"
              >
                {showPassword ? "🚫" : "👁️"}
              </button>
            </div>
            {/* Password confirmation input field with show/hide toggle */}
            <div className="relative">
              <label
                htmlFor="password_confirmation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm your password
              </label>
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                className="absolute right-2 top-9 text-gray-600 dark:text-gray-300"
              >
                {showPasswordConfirmation ? "🚫" : "👁️"}
              </button>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            {/* Login button */}
            <button
  type="submit"
  disabled={isLoading}
  className="w-full flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  {isLoading ? (
    <>
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-white animate-spin fill-blue-600"
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
    "Sign up"
  )}
</button>
            {/* Sign up link */}
            <div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 ml-2">
                you have an account{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-700 hover:underline dark:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
