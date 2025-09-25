import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import '../styles/admin-dashboard.css';
import AdminSidebar from './AdminSidebar';
import AdminHome from './AdminHome';
import AdminCustomers from './AdminCustomers';
import AdminProjects from './AdminProjects';
import AdminContactUs from './AdminContactUs';
import AdminJoinUs from './AdminJoinUs';

type DashboardPage = 'home' | 'customers' | 'projects' | 'contactus' | 'joinus';

const AdminDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<DashboardPage>('home');
  const navigate = useNavigate();
  const { logout, username } = useAuth();

  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem('adminToken');
    // Use auth context logout
    logout();
    // Navigate to home page
    navigate('/');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <AdminHome />;
      case 'customers':
        return <AdminCustomers />;
      case 'projects':
        return <AdminProjects />;
      case 'contactus':
        return <AdminContactUs />;
      case 'joinus':
        return <AdminJoinUs />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="dashboard-content">
        <div className="admin-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {username || 'Admin'}</p>
          </div>
          <div className="header-right">
            <button className="logout-button" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
