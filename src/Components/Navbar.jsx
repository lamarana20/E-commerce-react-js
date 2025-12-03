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

    const { token, logout, user } = useAuth();
    const navigate = useNavigate();
    const profileRef = useRef();

    // Close dropdown if clicked outside
    useEffect(() => {
        const clickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate("/login");
    };

    return (
        <>
            <nav className="flex justify-between items-center py-5 font-medium px-4 md:px-10 relative">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Store Logo" className="w-24 h-12 object-contain" />
                </Link>

                {/* DESKTOP MENU */}
                <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold" : "hover:text-black")}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "font-bold" : "hover:text-black")}>
                        About
                    </NavLink>
                    <NavLink to="/collection" className={({ isActive }) => (isActive ? "font-bold" : "hover:text-black")}>
                        Collection
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? "font-bold" : "hover:text-black")}>
                        Contact
                    </NavLink>
                </ul>

                {/* RIGHT ICONS */}
                <div className="flex items-center gap-4">
                    {/* SEARCH */}
                    <button onClick={() => setShowSearch(true)} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <FaSearch className="w-5 h-5" />
                    </button>

                    {/* USER MENU */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setShowProfileMenu((prev) => !prev)}
                            className={`p-2 rounded-full transition flex items-center gap-2 ${
                                token ? "bg-gray-100" : "hover:bg-gray-100"
                            }`}
                        >
                            <FaUser className="w-5 h-5" />
                            {/* Afficher le prénom si connecté */}
                            {token && user?.name && (
                                <span className="hidden md:block text-sm font-medium">
                                    {user.name.split(" ")[0]}
                                </span>
                            )}
                        </button>

                        {/* DROPDOWN */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-30 border">
                                {!token ? (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {/* User Info */}
                                        <div className="px-4 py-2 border-b">
                                            <p className="font-medium text-sm">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>

                                        <Link
                                            to="/dashboard"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-50"
                                        >
                                            My Orders
                                        </Link>

                                        {/* Admin Only */}
                                        {user?.role === "admin" && (
                                            <>
                                                <div className="border-t my-1"></div>
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="block px-4 py-2 hover:bg-gray-50 text-blue-600 font-medium"
                                                >
                                                    🔧 Admin Panel
                                                </Link>
                                            </>
                                        )}

                                        <div className="border-t my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* CART */}
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <FaShoppingCart className="w-5 h-5" />
                        {getCountCart() > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                                {getCountCart()}
                            </span>
                        )}
                    </Link>

                    {/* MOBILE MENU BUTTON */}
                    <button className="sm:hidden p-2" onClick={() => setVisible(true)}>
                        <FaBars className="text-xl" />
                    </button>
                </div>
            </nav>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-300 sm:hidden ${
                    visible ? "w-64" : "w-0 overflow-hidden"
                }`}
            >
                <button className="flex items-center gap-3 p-4 bg-gray-100 w-full" onClick={() => setVisible(false)}>
                    <FaArrowLeft /> Back
                </button>

                {/* User Info Mobile */}
                {token && user && (
                    <div className="p-4 border-b bg-gray-50">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                )}

                <nav className="flex flex-col p-4 text-gray-700">
                    <NavLink to="/" onClick={() => setVisible(false)} className="py-2 hover:text-black">
                        Home
                    </NavLink>
                    <NavLink to="/about" onClick={() => setVisible(false)} className="py-2 hover:text-black">
                        About
                    </NavLink>
                    <NavLink to="/collection" onClick={() => setVisible(false)} className="py-2 hover:text-black">
                        Collection
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setVisible(false)} className="py-2 hover:text-black">
                        Contact
                    </NavLink>

                    <div className="border-t my-2"></div>

                    {!token ? (
                        <>
                            <NavLink to="/login" onClick={() => setVisible(false)} className="py-2">
                                Login
                            </NavLink>
                            <NavLink to="/register" onClick={() => setVisible(false)} className="py-2">
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/dashboard" onClick={() => setVisible(false)} className="py-2">
                                Dashboard
                            </NavLink>
                            <NavLink to="/profile" onClick={() => setVisible(false)} className="py-2">
                                My Profile
                            </NavLink>
                            <NavLink to="/orders" onClick={() => setVisible(false)} className="py-2">
                                My Orders
                            </NavLink>

                            {user?.role === "admin" && (
                                <>
                                    <div className="border-t my-2"></div>
                                    <NavLink
                                        to="/admin"
                                        onClick={() => setVisible(false)}
                                        className="py-2 text-blue-600 font-medium"
                                    >
                                        🔧 Admin Panel
                                    </NavLink>
                                </>
                            )}

                            <div className="border-t my-2"></div>
                            <button className="py-2 text-left text-red-600" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {/* BACKDROP */}
            {visible && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setVisible(false)} />}
        </>
    );
};

export default Navbar;