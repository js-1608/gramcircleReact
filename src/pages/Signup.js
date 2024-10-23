import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Signup = () => {

    const navigate = useNavigate();

    const handleSignup = (event) => {
      event.preventDefault();
      // Logic for signing up (e.g., API call)
  
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    };

    
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Form */}
      <div className="md:w-1/2 bg-white flex justify-center items-center py-12 px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Create Your Account</h2>
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section: Image (only on larger screens) */}
      <div className="hidden md:block md:w-1/2 bg-color">
        <img
          src="../home/signup.png"
          alt="Signup Visual"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default Signup;
