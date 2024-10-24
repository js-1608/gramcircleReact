import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPverification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOTPSubmit = (event) => {
    event.preventDefault();

    // Validate OTP (this would typically involve an API call)
    if (otp === '123456') {
      // If OTP is correct, navigate to the reset password screen
      navigate('/reset-password');
    } else {
      // Display error message if OTP is incorrect
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">OTP Verification</h2>
        <p className="text-md text-gray-600 text-center mb-4">
        An 4 digit code has been sent to your email  ****gd@gmail.com. Enter the OTP code below to veirify        </p>
        <form onSubmit={handleOTPSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter 6-digit OTP"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-custom-gradient hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPverification;
