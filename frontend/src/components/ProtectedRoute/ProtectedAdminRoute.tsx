import React from 'react';
import { Navigate } from 'react-router-dom';
import adminAuthService from '../../services/adminAuthService';

interface Props {
  children: JSX.Element;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const user = adminAuthService.getCurrentUser();
  const lastLogin = user?.lastLogin;
  const isAdmin = user?.role === 'admin';

  if (!lastLogin || !isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
