import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuth, isAdmin } = useAuth();
  const adminToken = localStorage.getItem('adminToken');

  // Check if user is authenticated and is admin
  if (!isAuth || !isAdmin || !adminToken) {
    // Redirect to home page if not authenticated or not admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
