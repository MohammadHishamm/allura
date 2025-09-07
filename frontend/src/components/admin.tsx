import React, { useState } from 'react';
import '../styles/admin.css';
import '../styles/signup.css';
import '../styles/admin-dashboard.css';
import Notification from './Notification';
import LightRays from './background';
import AdminDashboard from './AdminDashboard';

interface LoginFormData {
  email: string;
  password: string;
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://weather-app-5b0s.onrender.com/user/login', {
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
      
      <AdminDashboard />
      
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
