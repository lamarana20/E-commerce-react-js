// GuestRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const GuestRoute = ({ children }) => {
  const { token } = useAuth();

  // Si connecté → redirection vers Home (ou autre)
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Sinon, laisse accéder
  return children;
};

export default GuestRoute;
