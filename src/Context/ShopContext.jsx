import { createContext, useState, useEffect, } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const[orders, setOrders] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://store-management-backend-main-ehdxlo.laravel.cloud/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error('Erreur de chargement des produits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

//add to cart
const addToCart = (productId, size) => {
  if(!size){
    toast.error('Please select a size');
    return;
  }
  const cartData = structuredClone(cartItems);
  if(cartData[productId]){
    if(cartData[productId][size]){
      cartData[productId][size] += 1;
    }else{
      cartData[productId][size] = 1;
    }
  }
  else{
    cartData[productId] = {};
    cartData[productId][size] = 1;

  }
  setCartItems(cartData);


}
//deleiverr fee
const deliveryFee = 5.00

//update quantity
const updateQuntity = async (productId,size,quantity) =>{
  let cartData = structuredClone(cartItems);
  cartData[productId][size] = quantity;
  setCartItems(cartData);

}
const getCartAmount =() =>{
  let totalAmount = 0;
  for(const productId in cartItems){
    let itemInfo = products.find((product) => product.id === parseInt(productId));
    for(const item in cartItems[productId]){
      try {
        if(cartItems[productId][item] > 0) {
          totalAmount += itemInfo.price * cartItems[productId][item];
        }
      } catch {
        toast.error('Error fetching product information');
      }
    }
  }
  return totalAmount;
}


//count of items in cart
function getCountCart() {
  let count = 0;
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      count += cartItems[productId][size];
    }
  }
  return count;
}
//order
const placeOrder = () => {
  if (Object.keys(cartItems).length === 0) {
    toast.error("Your cart is empty!");
    return;
  }

  const order = {
    id: Date.now(),
    items: JSON.parse(JSON.stringify(cartItems)),
    total: getCartAmount() + deliveryFee,
    date: new Date().toLocaleString(),
    delivery: { ...deliveryInfo } 
  };

  setOrders((prevOrders) => [...prevOrders, order]);
  setCartItems({});
  toast.success("Order placed successfully!");
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
  updateQuntity,
  setCartItems,
  getCountCart,
  getCartAmount,
  deliveryFee,
  placeOrder,
  orders,
  deliveryInfo,
  setDeliveryInfo,

};

return (
  <ShopContext.Provider value={value}>
    {children}
  </ShopContext.Provider>
);

};export default ShopContextProvider;