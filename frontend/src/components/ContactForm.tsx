import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactFormData {
  firstName: string;
  lastName: string;
  projectTypes: string[];
  projectDescription: string;
  phoneNumber: string;
  potentialBudget: string;
}

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    projectTypes: [],
    projectDescription: '',
    phoneNumber: '',
    potentialBudget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypeOptions = [
    'Web App',
    'Mobile App',
    'Desktop App'
  ];

  const budgetOptions = [
    'Under $ EGP 5,000',
    '$ EGP 10,000 - $ EGP 15,000',
    '$ EGP 15,000 - $ EGP 20,000',
    '$ EGP 20,000 - $ EGP 25,000',
    '$ EGP 25,000 - $ EGP 50,000',
    'Over $ EGP 50,000'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectTypeChange = (projectType: string) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(projectType)
        ? prev.projectTypes.filter(type => type !== projectType)
        : [...prev.projectTypes, projectType]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://weather-app-5b0s.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          projectTypes: [],
          projectDescription: '',
          phoneNumber: '',
          potentialBudget: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 px-4 relative pt-56">
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something Amazing
          </h1>
          <p className="text-lg text-purple-200">
            Tell us about your project and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Contact Form */}
        <div className="relative z-10">
          {/* Glassy Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-purple-500/10 rounded-3xl blur-xl pointer-events-none"></div>
          
          {/* Form Container */}
          <div className="relative z-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-30">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 relative z-30 cursor-target"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 relative z-30 cursor-target"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Project Types */}
              <div className="space-y-3">
                <label className="block text-white font-medium text-sm">
                  Project Type(s) * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {projectTypeOptions.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 relative z-30 ${
                        formData.projectTypes.includes(type)
                          ? 'bg-purple-500/30 border-purple-400 text-white'
                          : 'bg-white/10 border-white/20 text-purple-200 hover:bg-white/20'
                      } cursor-target`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.projectTypes.includes(type)}
                        onChange={() => handleProjectTypeChange(type)}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-400 focus:ring-2 relative z-40 cursor-target"
                      />
                      <span className="text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Project Description *
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none cursor-target"
                  placeholder="Describe your project in detail..."
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 cursor-target"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Potential Budget *
                </label>
                <select
                  name="potentialBudget"
                  value={formData.potentialBudget}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 relative z-30 cursor-target"
                >
                  <option value="" className="bg-gray-800 text-white">Select your budget range</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800 text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || formData.projectTypes.length === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 relative z-30 cursor-target"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Project Request'
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200 text-center">
                  ✅ Thank you! Your project request has been submitted successfully. We'll contact you soon!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-center">
                  ❌ Something went wrong. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Back Button */}
        {/* <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-md relative z-30 cursor-target"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ContactForm;
