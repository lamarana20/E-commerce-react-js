import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaArrowLeft } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // sidebar mobile
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCountCart } = useContext(ShopContext);
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef();

  // Fermer menu profil au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Déconnexion
  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center py-5 font-medium ml-2 mr-10 relative">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-12 object-contain hover:opacity-90 transition-opacity duration-300 ml-2.5"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}>
            <p>Home</p>
          </NavLink>
          <NavLink to="/about" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}>
            <p>About</p>
          </NavLink>
          <NavLink to="/collection" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}>
            <p>Collection</p>
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-black font-bold' : ''}`}>
            <p>Contact</p>
          </NavLink>
        </ul>

        {/* Icons right */}
        <div className="flex items-center gap-6">
          {/* Search icon */}
          <FaSearch
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <FaUser
              className="w-5 cursor-pointer"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 z-50 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-lg shadow-lg flex flex-col gap-2">
                {token ? (
                  <>
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <Link
                      to="/orders"
                      className="cursor-pointer hover:text-black"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Orders
                    </Link>
                      <Link
                      to="/dashboard"
                      className="cursor-pointer hover:text-black"
                      onClick={() => setShowProfileMenu(false)}
                    >
                     Dashboard
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="cursor-pointer hover:text-black"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="cursor-pointer hover:text-black"
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
          <Link to="/cart" className="relative">
            <FaShoppingCart className="w-5 min-w-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              {getCountCart()}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setVisible(true)}>
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full overflow-hidden bg-white z-50 transition-all duration-300 md:hidden ${
          visible ? "w-full sm:w-[300px]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          {/* Back Button */}
          <div
            className="flex items-center gap-4 p-4 bg-gray-100 border-b cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <FaArrowLeft className="w-5 h-5" />
            <p className="font-bold">Back</p>
          </div>

          {/* Links */}
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
          >
            Contact
          </NavLink>

          {/* Mobile Auth Links */}
          {token ? (
            <>
              <p
                onClick={() => {
                  handleLogout();
                  setVisible(false);
                }}
                className="py-3 pl-6 cursor-pointer"
              >
                Logout
              </p>
              <NavLink
                onClick={() => setVisible(false)}
                to="/orders"
                className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
              >
                Orders
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                to="/login"
                className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/register"
                className={({isActive}) => `py-3 pl-6 ${isActive ? 'text-black font-bold' : ''}`}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
