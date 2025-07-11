import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, hasResults } = useContext(ShopContext);
  const [visibleBar, setVisibleBar] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setVisibleBar(location.pathname.includes("collection"));
  }, [location]);

  useEffect(() => {
    if (showSearch && visibleBar) {
      inputRef.current?.focus();
    }
  }, [showSearch, visibleBar]);

  const handleClose = () => {
    setSearch("");
    setShowSearch(false);
  };

  if (!showSearch || !visibleBar) return null;

  return (
    <div className="bg-gray-50 py-4 border-y border-gray-200 text-center transition-opacity duration-300 ease-in-out">
      <div className="inline-flex items-center border border-gray-300 px-4 py-2 rounded-full w-[85%] md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <input
          ref={inputRef}
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
          aria-hidden="true"
        />
      </div>
      <IoMdClose
        className="ml-2 inline text-gray-500 text-2xl cursor-pointer align-middle"
        onClick={handleClose}
        title="Close search bar"
        role="button"
        aria-label="Close search"
      />
      {search && search.length > 0 && !hasResults && (
        <p className="text-gray-500 mt-4">results found for "{search}"</p>
      )}
    </div>
  );
};

export default SearchBar;
