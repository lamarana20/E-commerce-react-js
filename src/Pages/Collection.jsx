import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import { CategoryContext } from "../Context/CategoryContext";
import Spinner from "../Components/Spinner";

const Collection = () => {
  const { categories } = useContext(CategoryContext);
  const { products, loading, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  // Handles category change
  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((catId) => catId !== value)
        : [...prev, value]
    );
  };

  // Handles subcategory change
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((sc) => sc !== value)
        : [...prev, value]
    );
  };

  // Filtering and sorting products
  useEffect(() => {
    let filtered = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_id);
      const subCategoryMatch =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(product.sub_category);
      return categoryMatch && subCategoryMatch;
    });
// Filter by search term
    if (search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
// Sort products
    if (sortOption === "High-Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Low-High") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilterProducts(filtered);
  }, [selectedCategories, selectedSubCategories, products, search, sortOption]);

  // Extracting unique subcategories
  useEffect(() => {
    const uniqueSubCats = [...new Set(products.map((p) => p.sub_category))];
    setSubCategories(uniqueSubCats);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      {/* Filters */}
      <div className="min-w-60">
        <p
          className="flex items-center my-2 text-xl cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
          <FaChevronDown
            className={`transition-transform duration-200 md:hidden ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Category</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              categories.map((category) => (
                <label key={category.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={category.id}
                    onChange={handleCategoryChange}
                  />
                  {category.name}
                </label>
              ))
            )}
          </div>
        </div>

        {/* Subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            {subCategories.map((subCat, idx) => (
              <label key={idx} className="flex gap-2 items-center" aria-label={`Filter by ${subCat} type`}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={subCat}
                  onChange={handleSubCategoryChange}
                  title={`Filter by ${subCat} type`}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Products"} />
          <select
            className="border border-gray-300 text-sm rounded-md p-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="High-Low">Price: High-Low</option>
            <option value="Low-High">Price: Low-High</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="flex justify-center items-center col-span-full">
              <Spinner />
            </div>
          ) : filterProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
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
      </div>
    </div>
  );
};

export default Collection;
