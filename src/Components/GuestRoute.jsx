// GuestRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const GuestRoute = ({ children }) => {
  const { token } = useAuth();

  // If authenticated → redirect to Home (or another route)
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return children;
};

export default GuestRoute;
