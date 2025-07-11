import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm py-10">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 rounded-4xl" />
          </Link>
          <p className="text-gray-500 mt-4 w-full md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
            non recusandae itaque earum rerum hic tenetur a sapiente.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>Delivery</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Support</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="tel:+15188782415">+1 518 878 2415</a>
            </li>
            <li>
              <a href="mailto:mamadoulamakalinko628@gmail.com">
                mamadoulamakalinko628@gmail.com
              </a>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-gray-200" />
        <p className="text-sm mt-4 py-5 text-center text-gray-600 font-medium">
          © 2024 MLD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
