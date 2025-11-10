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

//  Create all routes for the app using React Router
const router = createBrowserRouter(
  createRoutesFromElements(
    
    // Base layout (MainLayout) that wraps all pages
    <Route path="/" element={<MainLayout />}>
      
      {/* Default home page */}
      <Route index element={<Home />} />
      
      {/* Public routes */}
      <Route path="/product" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Card />} />
      <Route path="/terms" element={<Terms />} />

      {/*  Protected routes — only accessible if user is logged in */}
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

      {/* Guest-only routes — accessible only if user is NOT logged in */}
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

      {/* Fallback route for 404 Not Found pages */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    //  AuthContext is required to manage authentication for ProtectedRoute
    <AuthProvider> 
      <CategoryProvider>
        <ShopContextProvider>
          <RouterProvider router={router} />
        </ShopContextProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
