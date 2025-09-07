import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
  projects: number;
}

const AdminCustomers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Developer',
        status: 'active',
        joinDate: '2024-01-15',
        lastLogin: '2024-01-20',
        projects: 5
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Designer',
        status: 'active',
        joinDate: '2024-01-10',
        lastLogin: '2024-01-19',
        projects: 3
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'Manager',
        status: 'inactive',
        joinDate: '2023-12-20',
        lastLogin: '2024-01-15',
        projects: 8
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'Developer',
        status: 'pending',
        joinDate: '2024-01-18',
        lastLogin: 'Never',
        projects: 0
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@example.com',
        role: 'Designer',
        status: 'active',
        joinDate: '2024-01-05',
        lastLogin: '2024-01-20',
        projects: 2
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'status-badge active',
      inactive: 'status-badge inactive',
      pending: 'status-badge pending'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-badge';
  };

  if (loading) {
    return (
      <div className="admin-customers">
        <div className="page-header">
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">Manage your users and their information</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-customers">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        <p className="page-subtitle">Manage your users and their information</p>
      </div>

      <div className="customers-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Last Login</th>
              <th>Projects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="role-badge">{user.role}</span>
                </td>
                <td>
                  <span className={getStatusBadge(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <span className="projects-count">{user.projects}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">✏️</button>
                    <button className="action-btn delete">🗑️</button>
                    <button className="action-btn view">👁️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">👥</div>
          <h3>No users found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
