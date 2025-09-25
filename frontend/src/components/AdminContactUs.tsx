import React, { useState, useEffect } from 'react';

interface ContactData {
  _id: string;
  firstName: string;
  lastName: string;
  projectTypes: string[];
  projectDescription: string;
  phoneNumber: string;
  potentialBudget: string;
  createdAt: string;
}

const AdminContactUs: React.FC = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://weather-app-5b0s.onrender.com/contact');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      setError('Error fetching contacts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
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

  const openContactModal = (contact: ContactData) => {
    setSelectedContact(contact);
  };

  const closeContactModal = () => {
    setSelectedContact(null);
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2>Contact Us Submissions</h2>
          <p>Manage customer contact form submissions</p>
        </div>
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2>Contact Us Submissions</h2>
          <p>Manage customer contact form submissions</p>
        </div>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Contact Us Submissions</h2>
        <p>Manage customer contact form submissions ({contacts.length} total)</p>
        <button onClick={fetchContacts} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Project Types</th>
              <th>Budget</th>
              <th>Phone</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>
                  <div className="contact-name">
                    <strong>{contact.firstName} {contact.lastName}</strong>
                  </div>
                </td>
                <td>
                  <div className="project-types">
                    {contact.projectTypes.map((type, index) => (
                      <span key={index} className="project-type-tag">
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="budget">{contact.potentialBudget}</span>
                </td>
                <td>
                  <span className="phone">{contact.phoneNumber}</span>
                </td>
                <td>
                  <span className="date">{formatDate(contact.createdAt)}</span>
                </td>
                <td>
                  <button
                    onClick={() => openContactModal(contact)}
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

      {selectedContact && (
        <div className="modal-overlay" onClick={closeContactModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Details</h3>
              <button onClick={closeContactModal} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="contact-details">
                <div className="detail-row">
                  <label>Full Name:</label>
                  <span>{selectedContact.firstName} {selectedContact.lastName}</span>
                </div>
                <div className="detail-row">
                  <label>Phone Number:</label>
                  <span>{selectedContact.phoneNumber}</span>
                </div>
                <div className="detail-row">
                  <label>Project Types:</label>
                  <div className="project-types">
                    {selectedContact.projectTypes.map((type, index) => (
                      <span key={index} className="project-type-tag">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="detail-row">
                  <label>Budget Range:</label>
                  <span>{selectedContact.potentialBudget}</span>
                </div>
                <div className="detail-row">
                  <label>Project Description:</label>
                  <div className="description">
                    {selectedContact.projectDescription}
                  </div>
                </div>
                <div className="detail-row">
                  <label>Submitted:</label>
                  <span>{formatDate(selectedContact.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeContactModal} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactUs;
