import React, { useState, useEffect } from 'react';
import Notification from './Notification';

interface ProjectFormData {
  name: string;
  description: string;
  video: string;
  tags: string;
  githubLink: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  githubLink: string;
  video: string;
  createdAt: string;
  status: 'active' | 'completed' | 'pending';
}

interface VideoUploadResponse {
  success: boolean;
  videoUrl?: string;
  publicId?: string;
  duration?: number;
  message?: string;
  error?: string;
}

const AdminProjects: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
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
  const [projectData, setProjectData] = useState<ProjectFormData>({
    name: '',
    description: '',
    video: '',
    tags: '',
    githubLink: ''
  });
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      
      // Check all possible token keys
      const adminToken = localStorage.getItem('adminToken');
      const regularToken = localStorage.getItem('token');
      const token = adminToken || regularToken;
      
      console.log('=== DEBUGGING PROJECTS FETCH ===');
      console.log('Admin token:', adminToken);
      console.log('Regular token:', regularToken);
      console.log('Using token:', token);
      console.log('All localStorage keys:', Object.keys(localStorage));
      
      const response = await fetch('https://weather-app-5b0s.onrender.com/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const responseData = await response.json();
        console.log('Fetched projects data:', responseData);
        
        // Check if the response has a data property with projects
        const projectsData = responseData.data || responseData;
        console.log('Projects data:', projectsData);
        
        if (Array.isArray(projectsData) && projectsData.length > 0) {
          // Transform the data to match our interface
          const transformedProjects = projectsData.map((project: any) => ({
            _id: project._id,
            name: project.name,
            description: project.description,
            tags: Array.isArray(project.tags) ? project.tags : (project.tags || '').split(',').map((tag: string) => tag.trim()),
            githubLink: project.githubLink || '',
            video: project.video || '',
            createdAt: project.createdAt || new Date().toISOString(),
            status: project.status || 'active'
          }));
          
          console.log('Transformed projects:', transformedProjects);
          setProjects(transformedProjects);
        } else {
          console.log('No projects found in response, showing sample data');
          showSampleProjects();
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch projects:', response.status, errorText);
        showSampleProjects();
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      showSampleProjects();
    } finally {
      setLoadingProjects(false);
    }
  };

  const showSampleProjects = () => {
    const sampleProjects = [
      {
        _id: '1',
        name: 'Sample Project 1',
        description: 'This is a sample project description',
        tags: ['React', 'TypeScript'],
        githubLink: 'https://github.com/sample/project1',
        video: '',
        createdAt: new Date().toISOString(),
        status: 'active' as const
      },
      {
        _id: '2',
        name: 'Sample Project 2',
        description: 'Another sample project',
        tags: ['Node.js', 'Express'],
        githubLink: 'https://github.com/sample/project2',
        video: '',
        createdAt: new Date().toISOString(),
        status: 'completed' as const
      }
    ];
    setProjects(sampleProjects);
  };

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleVideoUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('video', file);

      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('https://weather-app-5b0s.onrender.com/upload/video', {
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
      const videoUrl = await handleVideoUpload(selectedVideo);

      if (!videoUrl) {
        throw new Error('Failed to upload video');
      }

      const tagsArray = projectData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // Get token from localStorage (AuthProvider stores it there)
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('https://weather-app-5b0s.onrender.com/projects', {
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
        setError('');
        setNotification({
          message: 'Project added successfully!',
          type: 'success',
          isVisible: true
        });
        // Refresh projects list
        fetchProjects();
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

  return (
    <div className="admin-projects">
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">Manage your projects</p>
      </div>

      <div className="projects-content">
        <div className="projects-grid">
          {/* Quick Add Project Card */}
          <div className="project-card add-project-card">
            <div className="card-header">
              <h3>Add New Project</h3>
              <span className="add-icon">+</span>
            </div>
            <form onSubmit={handleAddProject} className="compact-form">
              <input
                type="text"
                value={projectData.name}
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                placeholder="Project Name"
                className="compact-input"
                required
              />
              <input
                type="text"
                value={projectData.tags}
                onChange={(e) => setProjectData({ ...projectData, tags: e.target.value })}
                placeholder="Tags (comma-separated)"
                className="compact-input"
              />
              <textarea
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                placeholder="Project Description"
                className="compact-textarea"
                rows={2}
                required
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedVideo(file);
                }}
                className="compact-file-input"
                required
              />
              <input
                type="url"
                value={projectData.githubLink}
                onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value })}
                placeholder="GitHub Link (optional)"
                className="compact-input"
              />
              {selectedVideo && (
                <div className="file-info">
                  📁 {selectedVideo.name} ({(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="compact-submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Recent Projects */}
          <div className="project-card">
            <div className="card-header">
              <h3>Recent Projects</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button 
                  onClick={fetchProjects}
                  style={{
                    background: 'rgba(160, 160, 255, 0.2)',
                    border: '1px solid rgba(160, 160, 255, 0.3)',
                    color: '#a0a0ff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  Refresh
                </button>
                <span className="view-all">View All ({projects.length})</span>
              </div>
            </div>
            <div className="projects-list">
              {loadingProjects ? (
                <div className="loading-projects">
                  <div className="loading-spinner"></div>
                  <p>Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="no-projects">
                  <p>No projects found</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="project-item">
                    <div className="project-info">
                      <h4>{project.name}</h4>
                      <p>{project.tags.join(', ')}</p>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="github-link"
                        >
                          🔗 GitHub
                        </a>
                      )}
                    </div>
                    <div className={`project-status ${project.status}`}>
                      {project.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Project Stats */}
          <div className="project-card">
            <div className="card-header">
              <h3>Project Statistics</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{projects.length}</div>
                <div className="stat-label">Total Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{projects.filter(p => p.status === 'active').length}</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{projects.filter(p => p.status === 'completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{projects.filter(p => p.status === 'pending').length}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
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
};

export default AdminProjects;
