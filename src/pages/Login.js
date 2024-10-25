import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the data being sent
      console.log('Sending data:', { emailId, password });

      const response = await axios.post('https://localhost:7285/api/users/login', {
        emailId,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response); // Debug response

      if (response.data && response.data.token) {
        login(response.data.token);
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage('Login failed: No token received');
      }
    } catch (error) {
      console.error('Full error:', error); // More detailed error logging
      if (error.response) {
        setMessage(`Login failed: ${error.response.data}`);
      } else if (error.request) {
        setMessage('Login failed: No response from server');
      } else {
        setMessage(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Form */}
      <div className="md:w-1/2 m-auto bg-white flex justify-center items-center py-12 px-6">
        <div className="w-full max-w-md">
        <div className="m-auto text-center mb-6 text-blue-900">
          <img
            src="./Logonew.png"
            alt="Logo"
            className="h-1/2 w-1/2 m-auto"
          />
          </div>          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Email Address"
                required
                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Mail Icon */}
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

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Lock Icon */}
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                  <path d="M17,10h-1V8c0-2.205-1.794-4-4-4S8,5.795,8,8v2H7c-1.103,0-2,0.896-2,2v7c0,1.104,0.897,2,2,2h10c1.103,0,2-0.896,2-2v-7  C19,10.896,18.103,10,17,10z M12,18.299c-0.719,0-1.3-0.58-1.3-1.299s0.581-1.301,1.3-1.301s1.3,0.582,1.3,1.301  S12.719,18.299,12,18.299z M14,11h-4V8c0-1.104,0.897-2,2-2s2,0.896,2,2V11z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember_me"
                  name="remember_me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgotPassword" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-900 to-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>

            {/* Google and Facebook Login */}
            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {/* Google Icon */}
                  <path d="M21.35 11.1H12v2.67h5.38c-.23 1.34-1.33 2.48-2.69 3.05v2.54h4.33c2.53-2.3 3.99-5.68 3.99-9.61 0-.64-.05-1.29-.15-1.92zM12 22c2.7 0 4.96-.9 6.62-2.45l-3.09-2.53C14.5 17.68 13.3 18 12 18c-3.44 0-6.35-2.3-7.36-5.5H1.18v2.86C3.01 19.57 7.2 22 12 22zM5 14.5v-5H2.5v5H5zm7-7c1.3 0 2.45.43 3.35 1.14l2.55-2.55C16.96 4.1 14.57 3 12 3 7.2 3 3 5.43 1.18 8.64L5 11.5c1-3.2 3.9-5.5 7-5.5z" />
                </svg>
                Sign in with Google
              </button>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {/* Facebook Icon */}
                  <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6c0-.542.458-1 1-1h3V0h-4c-2.208 0-4 1.792-4 4v4z" />
                </svg>
                Sign in with Facebook
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section: Image (only on larger screens) */}
      {/* <div className="hidden md:block md:w-1/2 bg-color">
        <img
          src="../home/signup.png"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div> */}
    </div>
  );
};

export default Login;
