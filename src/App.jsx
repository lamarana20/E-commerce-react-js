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
import Profile from "./Pages/Profile";

// Dashboards
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminOrders from "./Pages/Admin/AdminOrders";
// import AdminUsers from "./Pages/Admin/AdminUsers";
// import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminOrderDetails from "./Pages/Admin/AdminOrderDetails";


// Context
import ShopContextProvider from "./Context/ShopContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { AuthProvider } from "./Context/AuthContext";

// Route Guards
import ProtectedRoute from "./Components/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute";
import AdminRoute from "./Components/AdminRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="/product" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Card />} />
      <Route path="/terms" element={<Terms />} />

      {/* Guest-only routes */}
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

      {/* Protected routes (User) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
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

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />
      {/* <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      /> */}
      {/* <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      /> */}
      <Route
  path="/admin/orders/:id"
  element={
    <AdminRoute>
      <AdminOrderDetails />
    </AdminRoute>
  }
/>


      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
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