// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
