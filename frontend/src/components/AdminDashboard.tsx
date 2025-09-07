import React, { useState } from 'react';
import '../styles/admin-dashboard.css';
import AdminSidebar from './AdminSidebar';
import AdminHome from './AdminHome';
import AdminCustomers from './AdminCustomers';
import AdminProjects from './AdminProjects';

type DashboardPage = 'home' | 'customers' | 'projects';

const AdminDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<DashboardPage>('home');

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <AdminHome />;
      case 'customers':
        return <AdminCustomers />;
      case 'projects':
        return <AdminProjects />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
