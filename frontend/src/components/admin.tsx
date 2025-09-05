import React, { useState } from 'react';
import '../styles/admin.css';
import Notification from './Notification';
import LightRays from './background';

interface LoginFormData {
  email: string;
  password: string;
}

interface ProjectFormData {
  name: string;
  description: string;
  video: string;
  tags: string;
  githubLink: string;
}

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [projectData, setProjectData] = useState<ProjectFormData>({
    name: '',
    description: '',
    video: '',
    tags: '',
    githubLink: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.isAdmin) {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', result.token || 'admin-logged-in');
      } else {
        setError('Invalid credentials or insufficient permissions');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const tagsArray = projectData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectData,
          tags: tagsArray
        }),
      });

      if (response.ok) {
        setProjectData({
          name: '',
          description: '',
          video: '',
          tags: '',
          githubLink: ''
        });
        setError('');
        setNotification({
          message: 'Project added successfully!',
          type: 'success',
          isVisible: true
        });
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to add project');
      }
    } catch (error) {
      setError('Failed to add project. Please try again.');
      console.error('Add project error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
    setLoginData({ email: '', password: '' });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffffff"
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.6}
          noiseAmount={0}
          distortion={0}
          className="rays-fullscreen"
        />
        <div className="admin-card">
          <h2 className="admin-title">Admin Login</h2>
          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={closeNotification}
        />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={0.5}
        lightSpread={0.5}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.6}
        noiseAmount={0}
        distortion={0}
        className="rays-fullscreen"
      />
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-card">
        <h3 className="form-title">Add New Project</h3>
        <form onSubmit={handleAddProject} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              required
              className="form-input"
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              required
              className="form-textarea"
              placeholder="Enter project description"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="video">Video URL</label>
            <input
              type="url"
              id="video"
              value={projectData.video}
              onChange={(e) => setProjectData({ ...projectData, video: e.target.value })}
              required
              className="form-input"
              placeholder="Enter video URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={projectData.tags}
              onChange={(e) => setProjectData({ ...projectData, tags: e.target.value })}
              className="form-input"
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link (optional)</label>
            <input
              type="url"
              id="githubLink"
              value={projectData.githubLink}
              onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value })}
              className="form-input"
              placeholder="Enter GitHub repository URL"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Admin;
