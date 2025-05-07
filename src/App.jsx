import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Card from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

import Collection from "./pages/Collection";
import Home from "./pages/Home";
import  ShopContextProvider  from "./Context/ShopContext";
import { CategoryProvider } from './Context/CategoryContext';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/product" element={<Collection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    
      <Route path="/contact" element={<Contact/>} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element ={<Card/>}/>
      <Route path="/place-order" element={<PlaceOrder/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {

  return (
<CategoryProvider>
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
    </CategoryProvider>
  );
    


};

export default App;