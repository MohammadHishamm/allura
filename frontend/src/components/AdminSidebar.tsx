import React from 'react';

interface AdminSidebarProps {
  activePage: 'home' | 'customers' | 'projects';
  onPageChange: (page: 'home' | 'customers' | 'projects') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📁' }
  ] as const;

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Admin Panel</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
    </div>
  );
};

export default AdminSidebar;
