import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaArrowLeft } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCountCart } = useContext(ShopContext);
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center py-5 font-medium ml-2 mr-10 relative">
        {/* Logo */}
        <Link to="/" aria-label="Go to homepage">
          <img
            src={logo}
            alt="Store Logo"
            className="w-24 h-12 object-contain hover:opacity-90 transition-opacity duration-300 ml-2.5"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}
            >
              Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Icons right */}
        <div className="flex items-center gap-6">
          {/* Search icon */}
          <button
            onClick={() => setShowSearch(true)}
            aria-label="Open search"
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FaSearch className="w-5" />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-label="User menu"
              aria-expanded={showProfileMenu}
              aria-haspopup="true"
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaUser className="w-5" />
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 z-50 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-lg shadow-lg flex flex-col gap-2"
                role="menu"
                aria-orientation="vertical"
              >
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      role="menuitem"
                      className="cursor-pointer hover:text-black py-1"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      role="menuitem"
                      className="cursor-pointer hover:text-black py-1"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/dashboard"
                      role="menuitem"
                      className="cursor-pointer hover:text-black py-1"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      role="menuitem"
                      className="text-left cursor-pointer hover:text-black py-1"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      role="menuitem"
                      className="cursor-pointer hover:text-black py-1"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      role="menuitem"
                      className="cursor-pointer hover:text-black py-1"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
            aria-label={`Shopping cart with ${getCountCart()} items`}
          >
            <FaShoppingCart className="w-5 min-w-5" />
            <span
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
              aria-hidden="true"
            >
              {getCountCart()}
            </span>
          </Link>

          {/* Mobile menu toggle - ✅ CORRIGÉ */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
            onClick={() => setVisible(true)}
            aria-label="Open navigation menu"
            aria-expanded={visible}
          >
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full overflow-hidden bg-white z-50 transition-all duration-300 md:hidden ${visible ? "w-full sm:w-[300px]" : "w-0"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col text-gray-700 h-full">
          {/* Back Button */}
          <button
            className="flex items-center gap-4 p-4 bg-gray-100 border-b cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setVisible(false)}
            aria-label="Close navigation menu"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>

          {/* Links */}
          <nav>
            <ul>
              <li>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/"
                  className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/about"
                  className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/collection"
                  className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                >
                  Collection
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/contact"
                  className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                >
                  Contact
                </NavLink>
              </li>

              {/* Mobile Auth Links */}
              {token ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setVisible(false);
                      }}
                      className="w-full text-left py-3 pl-6 cursor-pointer hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setVisible(false)}
                      to="/orders"
                      className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                    >
                      Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      onClick={() => setVisible(false)}
                      to="/login"
                      className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setVisible(false)}
                      to="/register"
                      className={({ isActive }) => `block py-3 pl-6 hover:bg-gray-100 transition ${isActive ? 'text-black font-bold bg-gray-50' : ''}`}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Backdrop overlay */}
      {visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setVisible(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;