import React, { useState } from 'react';
import '../styles/admin.css';
import '../styles/signup.css';
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

interface VideoUploadResponse {
  success: boolean;
  videoUrl?: string;
  publicId?: string;
  duration?: number;
  message?: string;
  error?: string;
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
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleVideoUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('video', file);

      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/upload/video', {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });

      const result: VideoUploadResponse = await response.json();

      if (result.success && result.videoUrl) {
        console.log('✅ Video uploaded successfully:', result.videoUrl);
        return result.videoUrl;
      } else {
        throw new Error(result.error || 'Video upload failed');
      }
    } catch (error) {
      console.error('❌ Video upload error:', error);
      throw error;
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!selectedVideo) {
        throw new Error('Please select a video file');
      }

      console.log('📤 Uploading video file...');
      setUploadProgress(10);
      const videoUrl = await handleVideoUpload(selectedVideo);
      setUploadProgress(100);

      if (!videoUrl) {
        throw new Error('Failed to upload video');
      }

      const tagsArray = projectData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // Get token from localStorage (AuthProvider stores it there)
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...projectData,
          video: videoUrl,
          tags: tagsArray
        }),
      });

      console.log('📝 Project creation response status:', response.status);
      const responseData = await response.json();
      console.log('📝 Project creation response data:', responseData);

      if (response.ok) {
        setProjectData({
          name: '',
          description: '',
          video: '',
          tags: '',
          githubLink: ''
        });
        setSelectedVideo(null);
        setUploadProgress(0);
        setError('');
        setNotification({
          message: 'Project added successfully!',
          type: 'success',
          isVisible: true
        });
      } else {
        setError(responseData.message || 'Failed to add project');
      }
    } catch (error) {
      setError('Failed to add project. Please try again.');
      console.error('Add project error:', error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="signup-form-container">
          <div className="signin-form-wrapper">
            <div className="signup-step">
              <h2 className="step-title">Admin Login</h2>
              <p className="step-description">Sign in to access the admin panel</p>
              
              <form onSubmit={handleLogin} className="signin-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="form-input"
                    placeholder="Enter your email address"
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button 
                  type="submit" 
                  className="btn-theme"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
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
      
      <div className="glass-admin-card" style={{ position: 'relative', zIndex: 10 }}>
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
            <label htmlFor="video">Video Upload</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedVideo(file);
                }
              }}
              className="form-input"
              required
            />
            {selectedVideo && (
              <p style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
                Selected: {selectedVideo.name} ({(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${uploadProgress}%`, 
                    height: '100%', 
                    backgroundColor: '#007bff',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <p style={{ marginTop: '4px', color: '#666', fontSize: '12px' }}>
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
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
