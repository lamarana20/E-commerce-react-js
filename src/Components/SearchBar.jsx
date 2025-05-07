import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    // Context
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visibleBar, setVisibleBar] = useState(false);
  const location = useLocation();
// setVisibleBar to true if the current path includes "collection"
  useEffect(() => {
    setVisibleBar(location.pathname.includes("collection"));
  }, [location, showSearch]);

  if (!showSearch || !visibleBar) return null;

  return (
    <div className="bg-gray-50 py-4 border-y border-gray-200 text-center">
      <div className="inline-flex items-center border border-gray-300 px-4 py-2 rounded-full w-11/12 sm:w-1/3">
        <input
          type="text"
          aria-label="Search products"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <FaSearch
          className="ml-2 text-gray-500 text-lg cursor-pointer"
          title="Search icon"
          role="img"
        />
      </div>
      <IoMdClose
        className="ml-4 inline text-gray-500 text-2xl cursor-pointer align-middle"
        onClick={() => setShowSearch(false)}
        title="Close search bar"
        role="button"
        aria-label="Close search"
      />
    </div>
  );
};

export default SearchBar;
