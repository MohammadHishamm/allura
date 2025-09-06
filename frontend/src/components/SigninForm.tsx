import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { useAuth } from '../auth/auth';
import '../styles/signup.css';

interface SigninData {
  email: string;
  password: string;
}

interface SigninErrors {
  email?: string;
  password?: string;
}

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [signinData, setSigninData] = useState<SigninData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<SigninErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const validateForm = (): boolean => {
    const newErrors: SigninErrors = {};
    
    if (!signinData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signinData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!signinData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SigninData, value: string) => {
    setSigninData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof SigninErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof SigninErrors]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://weather-app-5b0s.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signinData.email,
          password: signinData.password
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Login successful:', result);
        console.log('🔑 JWT Token:', result.token);
        
        // Login the user with JWT token
        login(result.username, result.token, result.isAdmin);
        
        setNotification({
          message: 'Welcome back! Redirecting to home...',
          type: 'success',
          isVisible: true
        });
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const result = await response.json();
        
        setNotification({
          message: result.data || 'Invalid credentials. Please try again.',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      setNotification({
        message: 'Network error. Please check your connection and try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-form-container">
      <div className="signin-form-wrapper">
        <div className="signup-step">
          <h2 className="step-title">Welcome Back</h2>
          <p className="step-description">Sign in to your account to continue</p>
          
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={signinData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                disabled={isLoading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={signinData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-theme signin-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-content">
                  <div className="spinner-small"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="signin-footer">
            <p className="signin-link-text">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={handleSignupClick}
                className="signin-link-button"
                disabled={isLoading}
              >
                Sign up here
              </button>
            </p>
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

export default SigninForm;
