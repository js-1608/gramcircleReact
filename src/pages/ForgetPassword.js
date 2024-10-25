import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7285/api/users/forgot-password', {
        emailId: email
      });

      if (response.data) {
        setMessage('Password reset link has been sent to your email.');
        localStorage.setItem('resetEmail', email); // Store email for OTP verification
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Failed: ${error.response.data}`);
      } else if (error.request) {
        setMessage('Failed: No response from server');
      } else {
        setMessage(`Failed: ${error.message}`);
      }
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shadow sm:rounded-lg">
        <button
          onClick={handleBack}
          className="mb-4 ml-4 mt-4 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none text-black bg-gray-100 w-[30px] rounded-xl"
        >
          <svg
            className="h-5 w-5 m-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="mt-6 text-center text-3xl font-bold text-black-900">
          Reset password
        </h2>
        <p className="mt-2 text-center text-md text-gray-500">
          Don't worry! It happens. Please enter the email address associated with your account
        </p>

        {/* Message Display */}
        {message && (
          <div className={`mt-4 mx-4 p-3 rounded-lg text-center ${
            message.includes('sent') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 12l8-5.99V6L12 11 4 6zm0 12h16V8l-8 5L4 8v10z" />
                  </svg>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-900 to-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Back to Login
              </Link>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
