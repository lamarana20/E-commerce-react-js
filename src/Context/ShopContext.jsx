import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  const deliveryFee = 5.0;

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://store-management-backend-main-ehdxlo.laravel.cloud/api/products"
        );
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        toast.error(`Failed to load products: ${err?.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (Object.keys(cartItems).length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        localStorage.removeItem("cartItems");
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }, []);

  // Add product to cart
  const addToCart = (productId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    setCartItems((prevCart) => {
      const cartData = structuredClone(prevCart);
      
      if (cartData[productId]) {
        if (cartData[productId][size]) {
          cartData[productId][size] += 1;
        } else {
          cartData[productId][size] = 1;
        }
      } else {
        cartData[productId] = { [size]: 1 };
      }
      
      return cartData;
    });

    toast.success("Product added to cart");
  };

  // Update cart item quantity
  const updateQuantity = (productId, size, quantity) => {
    setCartItems((prevCart) => {
      const cartData = structuredClone(prevCart);
      
      if (quantity <= 0) {
        delete cartData[productId][size];
        
        if (Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId];
        }
        
        toast.success("Item removed from cart");
      } else {
        cartData[productId][size] = quantity;
        toast.success("Quantity updated");
      }
      
      return cartData;
    });
  };

  // Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    
    for (const productId in cartItems) {
      const product = products.find((p) => p.id === parseInt(productId));
      
      if (!product) {
        console.warn(`Product ${productId} not found`);
        continue;
      }
      
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          totalAmount += product.price * quantity;
        }
      }
    }
    
    return totalAmount;
  };

  // Count total items in cart
  const getCountCart = () => {
    let count = 0;
    
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    
    return count;
  };

  // Place order
  const placeOrder = async (paymentMethod = "stripe") => {
    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      throw new Error("Empty cart");
    }

    if (!deliveryInfo.email || !deliveryInfo.firstName) {
      toast.error("Please provide delivery information!");
      throw new Error("Missing delivery info");
    }

    try {
      const order = {
        id: Date.now(),
        items: JSON.parse(JSON.stringify(cartItems)),
        total: getCartAmount() + deliveryFee,
        subtotal: getCartAmount(),
        deliveryFee: deliveryFee,
        date: new Date().toISOString(),
        delivery: { ...deliveryInfo },
        payment: paymentMethod,
        status: "pending"
      };

      if (!order.date || !order.total || !order.items) {
        throw new Error("Invalid order data");
      }

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [...existingOrders, order];
      
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);

      setCartItems({});
      localStorage.removeItem("cartItems");
      setDeliveryInfo({});

      toast.success("Order placed successfully!");
      return order;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
      throw error;
    }
  };

  const value = {
    products,
    loading,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCountCart,
    getCartAmount,
    deliveryFee,
    orders,
    setOrders,
    placeOrder,
    deliveryInfo,
    setDeliveryInfo,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;