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

import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Card from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import NotFound from "./Pages/NotFound";
import Collection from "./Pages/Collection";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";

import ShopContextProvider from "./Context/ShopContext";
import { CategoryProvider } from './Context/CategoryContext';
import { AuthProvider } from "./Context/AuthContext"; 
import ProtectedRoute from "./Components/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<MainLayout />}>
      
      <Route index element={<Home />} />
      <Route path="/product" element={<Collection />} />
    
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Card />} />
      <Route path="/terms" element={<Terms />} />

      {/* ✅ Routes protégées */}
      <Route
        path="/place-order"
        element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
       <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
        />
        <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
            </GuestRoute>
           
        }

      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider> {/* ✅ AuthContext nécessaire pour ProtectedRoute */}
      <CategoryProvider>
        <ShopContextProvider>
           
          <RouterProvider router={router} />
        </ShopContextProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
