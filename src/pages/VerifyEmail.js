import React from 'react';
  
  const VerifyEmail = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default VerifyEmail;
  import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setToken } from '../utils/TokenUtils';

const EmailVerify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`https://localhost:7285/api/users/verifyemail`, {
        params: { token }
      });

      if (response.data && response.data.token) {
        setToken(response.data.token);
        setStatus('success');
        setMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/personal-detail');
        }, 3000);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage(error.response?.data || 'Email verification failed. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsResending(true);
    try {
      await axios.post('https://localhost:7285/api/users/resend-verification', { emailId: email });
      setMessage('New verification link has been sent to your email!');
      setStatus('success');
    } catch (error) {
      setMessage('Failed to resend verification link. Please try again.');
      setStatus('error');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/Logonew.png" alt="Logo" className="h-16 mx-auto" />
        </div>

        {/* Status Icon */}
        <div className="mb-6 text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          )}
          {status === 'success' && (
            <div className="bg-green-100 rounded-full p-3 inline-block">
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-100 rounded-full p-3 inline-block">
              <svg className="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <div className={`text-center mb-8 ${
          status === 'success' ? 'text-green-600' : 
          status === 'error' ? 'text-red-600' : 
          'text-blue-900'
        }`}>
          <h2 className="text-2xl font-bold mb-2">Email Verification</h2>
          <p className="text-lg">{message}</p>
        </div>

        {/* Resend Verification Section */}
        {status === 'error' && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Didn't receive the verification email?
            </h3>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className={`w-full py-3 px-4 rounded-full text-white font-medium transition-colors
                  ${isResending 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-900 to-black hover:from-blue-800 hover:to-gray-900'
                  }`}
              >
                {isResending ? 'Sending...' : 'Resend Verification Link'}
              </button>
            </div>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="text-center">
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
