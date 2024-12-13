import React from 'react'
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // This could be replaced with a real authentication check
    return sessionStorage.getItem('user') !== null;
  };
  
  const ProtectedRoutes = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };
  

export default ProtectedRoutes