import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper, { Step } from './signup';
import PricingPlans from './PricingPlans';
import Notification from './Notification';
import { useAuth } from '../auth/auth';
import '../styles/signup.css';

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  selectedPlan: string;
}

interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptedTerms?: string;
  selectedPlan?: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [signupData, setSignupData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
    selectedPlan: 'free' // Default to free plan
  });

  const [errors, setErrors] = useState<SignupErrors>({});
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

  const validateStep1 = useCallback((): boolean => {
    const newErrors: SignupErrors = {};
    
    if (!signupData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (signupData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [signupData]);

  const validateStep2 = useCallback((): boolean => {
    if (!signupData.acceptedTerms) {
      setErrors({ acceptedTerms: 'You must accept the terms and conditions' });
      return false;
    }
    setErrors({});
    return true;
  }, [signupData.acceptedTerms]);

  const handleInputChange = (field: keyof SignupData, value: string | boolean) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof SignupErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof SignupErrors]: undefined }));
    }
  };

  const handlePlanSelect = (planName: string) => {
    // Map plan names to proper values for backend
    const planMapping: { [key: string]: string } = {
      'Basic': 'basic',
      'Professional': 'pro', 
      'Ultimate': 'ultimate',
      '': 'free' // for skip option
    };
    
    const mappedPlan = planMapping[planName] || 'free';
    console.log('🎯 Plan selected:', { original: planName, mapped: mappedPlan });
    setSignupData(prev => ({ ...prev, selectedPlan: mappedPlan }));
  };

  const canProceedToNextStep = useCallback((currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        // Plan selection is optional, so always allow proceeding
        return true;
      case 4:
        // Final step - can proceed to submit
        return true;
      default:
        return false;
    }
  }, [validateStep1, validateStep2]);


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const requestData = {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        plan: signupData.selectedPlan
      };
      
      console.log('📤 Sending registration data:', requestData);
      
      const response = await fetch('https://weather-app-5b0s.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Registration successful:', result);
        console.log('🔑 JWT Token:', result.token);
        
        // Login the user with JWT token; ensure no stale admin token from previous admin session
        localStorage.removeItem('adminToken');
        login(result.username, result.token, false);
        
        setNotification({
          message: 'Account created successfully! Redirecting to home...',
          type: 'success',
          isVisible: true
        });
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const result = await response.json();
        console.log('❌ Registration failed:', result, 'Status:', response.status);
        
        // Clear form and show error
        setSignupData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptedTerms: false,
          selectedPlan: 'free'
        });
        setErrors({});
        
        setNotification({
          message: result.message || 'Failed to create account. Please try again.',
          type: 'error',
          isVisible: true
        });
        
        // Redirect to home page after showing error
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Registration network error:', error);
      
      // Clear form and show error
      setSignupData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
        selectedPlan: 'free'
      });
      setErrors({});
      
      setNotification({
        message: 'Network error. Please check your connection and try again.',
        type: 'error',
        isVisible: true
      });
      
      // Redirect to home page after showing error
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <div className="signup-form-container flex-grow pt-16 pb-20">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log('Current step:', step);
        }}
        onFinalStepCompleted={handleSubmit}
        backButtonText="Previous"
        nextButtonText="Next"
        canProceedToNextStep={canProceedToNextStep}
      >
        {/* Step 1: User Information */}
        <Step>
          <div className="signup-step">
            <h2 className="step-title">Create Your Account</h2>
            <p className="step-description">Let's get started with your basic information</p>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={signupData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Fill your full name"
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={signupData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={signupData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a strong password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={signupData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            {/* Sign-in link in Step 1 */}
            <div className="signup-footer">
              <p className="signup-link-text">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={handleSigninClick}
                  className="signup-link-button"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </Step>

        {/* Step 2: Terms and Conditions */}
        <Step>
          <div className="signup-step">
            <h2 className="step-title">Terms & Conditions</h2>
            <p className="step-description">Please review and accept our terms</p>
            
            <div className="terms-container">
              <div className="terms-content">
                <h3>Terms of Service</h3>
                <p>
                  By using our service, you agree to be bound by these terms and conditions. 
                  Please read them carefully before proceeding.
                </p>
                
                <h4>1. Acceptance of Terms</h4>
                <p>
                  By accessing and using this service, you accept and agree to be bound by the 
                  terms and provision of this agreement.
                </p>
                
                <h4>2. Use License</h4>
                <p>
                  Permission is granted to temporarily use our service for personal, 
                  non-commercial transitory viewing only.
                </p>
                
                <h4>3. Privacy Policy</h4>
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, 
                  use, and protect your information when you use our service.
                </p>
                
                <h4>4. User Accounts</h4>
                <p>
                  You are responsible for safeguarding the password and for maintaining the 
                  confidentiality of your account.
                </p>
              </div>
              
              <div className="terms-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={signupData.acceptedTerms}
                    onChange={(e) => handleInputChange('acceptedTerms', e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    I have read and agree to the Terms of Service and Privacy Policy
                  </span>
                </label>
                {errors.acceptedTerms && <span className="error-text">{errors.acceptedTerms}</span>}
              </div>
            </div>
          </div>
        </Step>

        {/* Step 3: Plan Selection */}
        <Step>
          <div className="signup-step">
            <h2 className="step-title">Choose Your Plan</h2>
            <p className="step-description">Select a plan that fits your needs (optional)</p>
            
            <div className="plan-selection">
              <PricingPlans 
                onPlanSelect={handlePlanSelect} 
                selectedPlan={signupData.selectedPlan === 'basic' ? 'Basic' :
                             signupData.selectedPlan === 'pro' ? 'Professional' :
                             signupData.selectedPlan === 'ultimate' ? 'Ultimate' : null}
                isSelectable={true}
              />
              
              <div className="skip-option">
                <button
                  type="button"
                  onClick={() => handlePlanSelect('')}
                  className={`skip-button ${signupData.selectedPlan === 'free' ? 'selected' : ''}`}
                >
                  Skip for now - I'll choose later
                </button>
              </div>
            </div>
          </div>
        </Step>

        {/* Step 4: Confirmation */}
        <Step>
          <div className="signup-step">
            <h2 className="step-title">Review Your Information</h2>
            <p className="step-description">Please review your details before creating your account</p>
            
            <div className="confirmation-summary">
              <div className="summary-section">
                <h3>Account Details</h3>
                <div className="summary-item">
                  <span className="label">Username:</span>
                  <span className="value">{signupData.username}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Email:</span>
                  <span className="value">{signupData.email}</span>
                </div>
              </div>
              
              <div className="summary-section">
                <h3>Selected Plan</h3>
                <div className="summary-item">
                  <span className="label">Plan:</span>
                  <span className="value">
                    {signupData.selectedPlan === 'free' ? 'Free' : 
                     signupData.selectedPlan === 'basic' ? 'Basic' :
                     signupData.selectedPlan === 'pro' ? 'Professional' :
                     signupData.selectedPlan === 'ultimate' ? 'Ultimate' :
                     'No plan selected (can be added later)'}
                  </span>
                </div>
              </div>
              
              <div className="summary-section">
                <h3>Agreements</h3>
                <div className="summary-item">
                  <span className="label">Terms Accepted:</span>
                  <span className="value">{signupData.acceptedTerms ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            
            {isLoading && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <span>Creating your account...</span>
              </div>
            )}

            {/* Sign-in link inside the form */}
            <div className="signup-footer">
              <p className="signup-link-text">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={handleSigninClick}
                  className="signup-link-button"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </Step>
      </Stepper>
      
      {/* Validation Error Display - This will be handled by the stepper component */}
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default SignupForm;
