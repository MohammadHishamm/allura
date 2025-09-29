import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JoinUsFormData {
  fullName: string;
  role: string;
  description: string;
  cvFile: File | null;
}

const JoinUsForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JoinUsFormData>({
    fullName: '',
    role: '',
    description: '',
    cvFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const roleOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'UI/UX Designer',
    'Project Manager',
    'DevOps Engineer',
    'Mobile Developer',
    'Data Scientist',
    'QA Engineer',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      cvFile: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!formData.cvFile) {
        setSubmitStatus('error');
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('role', formData.role);
      submitData.append('description', formData.description);
      submitData.append('cv', formData.cvFile);

      setUploadProgress(50);

      const response = await fetch('http://localhost:5000/joinus', {
        method: 'POST',
        body: submitData, // Don't set Content-Type header, let browser set it with boundary
      });

      setUploadProgress(100);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          role: '',
          description: '',
          cvFile: null
        });
        setUploadProgress(0);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative pt-32">
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-purple-200">
            Ready to build amazing things together? We'd love to hear from you!
          </p>
        </div>

        {/* Join Us Form */}
        <div className="relative z-10">
          {/* Glassy Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-purple-500/10 rounded-3xl blur-xl pointer-events-none"></div>
          
          {/* Form Container */}
          <div className="relative z-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-30">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 relative z-30 cursor-target"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Desired Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 relative z-30 cursor-target"
                >
                  <option value="" className="bg-gray-800 text-white">Select your desired role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role} className="bg-gray-800 text-white">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Tell us about yourself *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none cursor-target"
                  placeholder="Describe your experience, skills, and why you want to join our team..."
                />
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <label className="block text-white font-medium text-sm">
                  Upload your CV *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 cursor-target file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                  />
                  <div className="mt-2 text-xs text-purple-200">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-purple-200">
                    <span>Uploading CV...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.cvFile}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 relative z-30 cursor-target"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>
                        {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Submitting...'}
                      </span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200 text-center">
                  ✅ Thank you! Your application has been submitted successfully. We'll review it and get back to you soon!
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
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-md relative z-30 cursor-target"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUsForm;
