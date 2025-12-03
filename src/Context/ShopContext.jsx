import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const deliveryFee = 5.0;
  
  // Centralized API URLs
  const API_URL = "https://store-management-backend-main-ehdxlo.laravel.cloud/api";

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const addToCart = (productId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    setCartItems((prev) => {
      const cart = structuredClone(prev);
      if (!cart[productId]) cart[productId] = {};
      cart[productId][size] = (cart[productId][size] || 0) + 1;
      return cart;
    });

    toast.success("Added to cart");
  };

  const updateQuantity = (productId, size, quantity) => {
    setCartItems((prev) => {
      const cart = structuredClone(prev);

      if (quantity <= 0) {
        delete cart[productId][size];
        if (Object.keys(cart[productId]).length === 0) {
          delete cart[productId];
        }
      } else {
        cart[productId][size] = quantity;
      }

      return cart;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) continue;
      for (const size in cartItems[productId]) {
        total += product.price * cartItems[productId][size];
      }
    }
    return total;
  };

  const getCountCart = () => {
    let count = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    return count;
  };

  // Token is passed in as a parameter
  const placeOrder = async (paymentMethod, deliveryData, token) => {
     
    if (!token) {
      toast.error("Please login to place an order");
      throw new Error("Not authenticated");
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      throw new Error("Cart is empty");
    }

    const body = {
      items: cartItems,
      subtotal: getCartAmount(),
      delivery_fee: deliveryFee,
      total: getCartAmount() + deliveryFee,
      payment_method: paymentMethod,
      delivery_first_name: deliveryData.firstName,
      delivery_last_name: deliveryData.lastName,
      delivery_email: deliveryData.email,
      delivery_phone: deliveryData.phone,
      delivery_address: deliveryData.address,
      delivery_city: deliveryData.city,
      delivery_state: deliveryData.state,
      delivery_zip: deliveryData.zip,
      delivery_country: deliveryData.country,
    };

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Order failed");
    }

    setCartItems({});
    localStorage.removeItem("cartItems");

    return data;
  };

  const value = {
    products,
    loading,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCountCart,
    getCartAmount,
    deliveryFee,
    placeOrder,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
