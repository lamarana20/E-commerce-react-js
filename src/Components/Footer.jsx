import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 sm:px-12 lg:px-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm py-10">
        {/* Logo + Description */}
        <div>
          <Link to="/" aria-label="Home">
          < img src={logo} alt="MLD logo" className="w-20 sm:w-32 rounded" />
          </Link>
        <p className="text-gray-500 mt-4 max-w-md leading-relaxed">
  Your premier destination for cutting-edge technology and electronics. 
  We offer authentic products, competitive prices, and expert customer 
  support to ensure your satisfaction with every purchase.
</p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-5">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-black transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black transition">About</Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-black transition">Delivery</Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-5">Support</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a 
                href="tel:+15188782415" 
                className="hover:text-black transition"
                aria-label="Call us at +1 518 878 2415"
              >
                +1 518 878 2415
              </a>
            </li>
            <li>
              <a 
                href="mailto:mamadoulamakalinko628@gmail.com" 
                className="hover:text-black transition"
                aria-label="Email us"
              >
                mamadoulamakalinko628@gmail.com
              </a>
            </li>
            <li>
              <Link to="/terms" className="hover:text-black transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black transition">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="text-sm mt-4 py-5 text-center text-gray-600 font-medium">
          © 2025 MLD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;