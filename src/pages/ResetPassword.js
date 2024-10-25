import React from 'react';
  
  const ResetPassword = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default ResetPassword;
  import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      await axios.get(`https://localhost:7285/api/users/verify-reset-token`, {
        params: { token }
      });
      setIsValidToken(true);
    } catch (error) {
      setIsValidToken(false);
      setError('This password reset link is invalid or has expired.');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long and contain uppercase, lowercase, number, and special character');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7285/api/users/reset-password', {
        token,
        newPassword: password
      });

      setError('Password has been reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Ensure error message is a string
      const errorMessage = error.response?.data?.message || error.response?.data || 'Failed to reset password. Please try again.';
      setError(String(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Invalid Reset Link</h2>
          <p className="text-red-500 text-center mb-6">{error}</p>
          <Link
            to="/forgot-password"
            className="block text-center text-blue-600 hover:text-blue-500 font-medium"
          >
            Request a new password reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create new password</h2>
        <p className="text-md text-gray-600 mb-4">Your new password must be different from previous used passwords</p>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          {error && (
            <p className={`text-sm ${String(error).toLowerCase().includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-900 to-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
