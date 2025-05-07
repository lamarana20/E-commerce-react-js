import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaS } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";


const Navbar = () => {
  
  const [visible, setVisible] = React.useState(false);
  const {setShowSearch,getCountCart} =useContext(ShopContext);
  return (
    <>
      <div className="flex justify-between items-center py-5 font-medium ml-2 mr-10">
        <Link to='/'>
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-12 object-contain hover:opacity-90 transition-opacity duration-300 ml-2.5"
          />
        </Link>
        {/* Menu Links */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          <NavLink to="/About" className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>Collection</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-2/4 h-[1.5px] bg-gray-700 border-none hidden" />
          </NavLink>
          
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <FaSearch className="w-5 cursor-pointer"  onClick={()=>setShowSearch(true)}/>

          {/* Profile Dropdown */}
          <div className="relative group">
            <FaUser className="w-5 cursor-pointer" />

            <div className="hidden group-hover:block absolute right-0 dropdown-menu pt-2">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded-lg shadow-lg">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
                <Link to='login' className="cursor-pointer hover:text-black">Login</Link>
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative ">
            <FaShoppingCart className="w-5 min-w-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
          {getCountCart()}
            </span>
          </Link>
          <button className="md:hidden" onClick={() => setVisible(true)} >
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
        {/* side  Mobile Menu */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray">
            <div
              className="flex items-center gap-4 p-3 "
              onClick={() => setVisible(false)}
            >
              <FaArrowLeft className="w-5 h-5 te" />
              <p className="font-bold">Back</p>
            </div>
           <NavLink onClick={() =>setVisible(false)} to="/" className="py-2 pl-6">
           <p>Home</p>
         
           </NavLink>
           <NavLink onClick={() =>setVisible(false)} to="/About" className="py-2 pl-6">
           <p>About</p>
           </NavLink>
            <NavLink onClick={() =>setVisible(false)}to="/collection" className="py-2 pl-6">
            <p>Collection</p>
            </NavLink>
            <NavLink onClick={() =>setVisible(false)} to="/contact" className="py-2 pl-6">
            <p>Contact</p>
           
            </NavLink>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
