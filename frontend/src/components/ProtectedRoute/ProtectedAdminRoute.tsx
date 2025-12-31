import React from 'react';

interface Props {
  children: JSX.Element;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  // TODO: Implement auth check when backend is ready
  // For now, allow access to admin routes
  return children;
};

export default ProtectedAdminRoute;
