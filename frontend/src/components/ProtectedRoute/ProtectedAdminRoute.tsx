// components/ProtectedAdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/adminAuthService';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const isAdmin = AuthService.hasRole('admin');

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
