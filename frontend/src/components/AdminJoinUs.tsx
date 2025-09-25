import React, { useState, useEffect } from 'react';

interface JoinUsData {
  _id: string;
  fullName: string;
  role: string;
  description: string;
  cvUrl: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

const AdminJoinUs: React.FC = () => {
  const [applications, setApplications] = useState<JoinUsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JoinUsData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://weather-app-5b0s.onrender.com/joinus');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (err) {
      setError('Error fetching applications');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`https://weather-app-5b0s.onrender.com/joinus/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state
        setApplications(prev => 
          prev.map(app => 
            app._id === id ? { ...app, status: newStatus as any } : app
          )
        );
        // Update selected application if it's the same one
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'reviewed': return '#3b82f6';
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const openApplicationModal = (application: JoinUsData) => {
    setSelectedApplication(application);
  };

  const closeApplicationModal = () => {
    setSelectedApplication(null);
  };

  const filteredApplications = statusFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === statusFilter);

  if (loading) {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2>Join Us Applications</h2>
          <p>Manage job applications and CVs</p>
        </div>
        <div className="loading">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2>Join Us Applications</h2>
          <p>Manage job applications and CVs</p>
        </div>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Join Us Applications</h2>
        <p>Manage job applications and CVs ({applications.length} total)</p>
        <div className="header-actions">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={fetchApplications} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>CV</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application._id}>
                <td>
                  <div className="applicant-name">
                    <strong>{application.fullName}</strong>
                  </div>
                </td>
                <td>
                  <span className="role">{application.role}</span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(application.status) }}
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </td>
                <td>
                  <a 
                    href={application.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cv-link"
                  >
                    📄 View CV
                  </a>
                </td>
                <td>
                  <span className="date">{formatDate(application.createdAt)}</span>
                </td>
                <td>
                  <button
                    onClick={() => openApplicationModal(application)}
                    className="view-btn"
                  >
                    👁️ View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApplication && (
        <div className="modal-overlay" onClick={closeApplicationModal}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Application Details</h3>
              <button onClick={closeApplicationModal} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="application-details">
                <div className="detail-row">
                  <label>Full Name:</label>
                  <span>{selectedApplication.fullName}</span>
                </div>
                <div className="detail-row">
                  <label>Desired Role:</label>
                  <span>{selectedApplication.role}</span>
                </div>
                <div className="detail-row">
                  <label>Current Status:</label>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedApplication.status) }}
                  >
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
                <div className="detail-row">
                  <label>CV:</label>
                  <a 
                    href={selectedApplication.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cv-link-large"
                  >
                    📄 Download/View CV
                  </a>
                </div>
                <div className="detail-row">
                  <label>Description:</label>
                  <div className="description">
                    {selectedApplication.description}
                  </div>
                </div>
                <div className="detail-row">
                  <label>Applied:</label>
                  <span>{formatDate(selectedApplication.createdAt)}</span>
                </div>
                
                <div className="status-actions">
                  <label>Update Status:</label>
                  <div className="status-buttons">
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'pending')}
                      className={`status-btn ${selectedApplication.status === 'pending' ? 'active' : ''}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'reviewed')}
                      className={`status-btn ${selectedApplication.status === 'reviewed' ? 'active' : ''}`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'accepted')}
                      className={`status-btn ${selectedApplication.status === 'accepted' ? 'active' : ''}`}
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                      className={`status-btn ${selectedApplication.status === 'rejected' ? 'active' : ''}`}
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeApplicationModal} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJoinUs;
