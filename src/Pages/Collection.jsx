import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import { CategoryContext } from "../Context/CategoryContext";
import Spinner from "../Components/Spinner";

const Collection = () => {
  const { categories } = useContext(CategoryContext);
  const { products, loading, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  // Memoize subcategories to avoid recalculation on every render
  const subCategories = useMemo(() => {
    return [...new Set(products.map((p) => p.sub_category).filter(Boolean))];
  }, [products]);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((catId) => catId !== value)
        : [...prev, value]
    );
  };

  // Handle subcategory filter change
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((sc) => sc !== value)
        : [...prev, value]
    );
  };

  // Clear all active filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSortOption("relevant");
  };

  // Filter and sort products based on selected criteria
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category_id)
      );
    }

    // Apply subcategory filter
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubCategories.includes(product.sub_category)
      );
    }

    // Apply search filter
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort products by selected option
    if (sortOption === "High-Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Low-High") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilterProducts(filtered);
  }, [selectedCategories, selectedSubCategories, products, search, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-black">Home</a></li>
          <li>/</li>
          <li className="text-black font-medium">Collection</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar filters */}
        <aside className="lg:w-64 flex-shrink-0">
          {/* Filter header with toggle button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h2>
            
            {/* Mobile toggle button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
              onClick={() => setShowFilter(!showFilter)}
              aria-label="Toggle filters"
              aria-expanded={showFilter}
            >
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  showFilter ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Active filters indicator */}
          {(selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
            <div className="mb-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {selectedCategories.length + selectedSubCategories.length} filter(s) active
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Filters container */}
          <div
            className={`space-y-6 ${
              showFilter ? "block" : "hidden"
            } lg:block`}
          >
            {/* Category filter section */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Categories
                {selectedCategories.length > 0 && (
                  <span className="ml-auto text-xs bg-black text-white px-2 py-1 rounded-full">
                    {selectedCategories.length}
                  </span>
                )}
              </h3>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-4">
                    <Spinner />
                  </div>
                ) : categories.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2">No categories available</p>
                ) : (
                  categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black cursor-pointer"
                        value={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onChange={handleCategoryChange}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black">
                        {category.name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Subcategory filter section */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Type
                {selectedSubCategories.length > 0 && (
                  <span className="ml-auto text-xs bg-black text-white px-2 py-1 rounded-full">
                    {selectedSubCategories.length}
                  </span>
                )}
              </h3>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {subCategories.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2">No types available</p>
                ) : (
                  subCategories.map((subCat, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black cursor-pointer"
                        value={subCat}
                        checked={selectedSubCategories.includes(subCat)}
                        onChange={handleSubCategoryChange}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black capitalize">
                        {subCat}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1">
          {/* Page header with title and sort options */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <Title text1={"All"} text2={"Products"} />
              <p className="text-sm text-gray-600 mt-1">
                {loading ? (
                  "Loading products..."
                ) : (
                  <>
                    Showing {filterProducts.length} of {products.length} product
                    {products.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                className="border border-gray-300 text-sm rounded-lg px-4 py-2.5 bg-white hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-black transition cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevant">Relevance</option>
                <option value="Low-High">Price: Low to High</option>
                <option value="High-Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {(selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategories.map((catId) => {
                const category = categories.find((c) => c.id === catId);
                return category ? (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-sm rounded-full"
                  >
                    {category.name}
                    <button
                      onClick={() => handleCategoryChange({ target: { value: catId } })}
                      className="hover:bg-white/20 rounded-full p-0.5"
                      aria-label={`Remove ${category.name} filter`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ) : null;
              })}
              
              {selectedSubCategories.map((subCat) => (
                <span
                  key={subCat}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
                >
                  {subCat}
                  <button
                    onClick={() => handleSubCategoryChange({ target: { value: subCat } })}
                    className="hover:bg-white/20 rounded-full p-0.5"
                    aria-label={`Remove ${subCat} filter`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Products grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="flex justify-center items-center col-span-full py-20">
                <Spinner />
              </div>
            ) : filterProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                {(selectedCategories.length > 0 || selectedSubCategories.length > 0 || search) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filterProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_urls}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Collection;