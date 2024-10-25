import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
const SignUp = () => {
  const navigate = useNavigate();


  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility toggle
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to check if passwords match

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle between showing/hiding password
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordsMatch(e.target.value, confirmPassword); // Check if passwords match on password change
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordsMatch(password, e.target.value); // Check if passwords match on confirm password change
  };

  const checkPasswordsMatch = (pass, confirmPass) => {
    setPasswordsMatch(pass === confirmPass);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (passwordsMatch) {
      // Logic for authentication (e.g., API call)
      // Navigate to dashboard after successful sign up
      navigate('/dashboard');
    } else {
      alert("Passwords don't match");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      {/* Left Section: Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-3">
        <div className="w-full max-w-md">
          <div className="m-auto text-center mb-6 text-blue-900">
          <img
            src="./Logonew.png"
            alt="Logo"
            className="h-1/2 w-1/2 m-auto"
          />
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* User icon for First Name */}
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <circle cx="12" cy="8" fill="#464646" r="4"/>
                  <path d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z" fill="#464646"/>
                  </svg>
              </div>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                required
                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* User icon for First Name */}
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <circle cx="12" cy="8" fill="#464646" r="4"/>
                  <path d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z" fill="#464646"/>
                  </svg>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                required
                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Mail icon for Email */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* User icon for First Name */}
                <svg  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"><title/><path d="M12.69,12.06a1,1,0,0,1-1.34,0L2.87,4.35A2,2,0,0,1,4,4H20a2,2,0,0,1,1.13.35Z" fill="#464646"/><path d="M22,6.26V17a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V6.26l8.68,7.92a2,2,0,0,0,1.32.49,2,2,0,0,0,1.33-.51Z" fill="#464646"/></svg>
              </div>
              </div>
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between 'password' and 'text'
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 block w-full px-10 py-2 border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Filled lock icon */}
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M17,10h-1V8c0-2.205-1.794-4-4-4S8,5.795,8,8v2H7c-1.103,0-2,0.896-2,2v7c0,1.104,0.897,2,2,2h10c1.103,0,2-0.896,2-2v-7  C19,10.896,18.103,10,17,10z M12,18.299c-0.719,0-1.3-0.58-1.3-1.299s0.581-1.301,1.3-1.301s1.3,0.582,1.3,1.301  S12.719,18.299,12,18.299z M14,11h-4V8c0-1.104,0.897-2,2-2s2,0.896,2,2V11z" />
                </svg>
              </div>
              {/* Eye icon for toggling password visibility */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {passwordVisible ? (
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9-4.5s-3 7.5-9 7.5S3 7.5 3 7.5s3-7.5 9-7.5 9 7.5 9 7.5z" />
                  ) : (
                    <path d="M12 4.5C7.305 4.5 3.273 8.057 1.5 12c1.773 3.943 5.805 7.5 10.5 7.5S20.727 15.943 22.5 12C20.727 8.057 16.695 4.5 12 4.5zm0 10.5a3 3 0 100-6 3 3 0 000 6z" />
                  )}
                </svg>
              </div>
            </div>
            {/* Confirm Password */}

            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between 'password' and 'text'
                id="password"
                name="password"
                placeholder="Password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 block w-full px-10 py-2 border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Filled lock icon */}
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M17,10h-1V8c0-2.205-1.794-4-4-4S8,5.795,8,8v2H7c-1.103,0-2,0.896-2,2v7c0,1.104,0.897,2,2,2h10c1.103,0,2-0.896,2-2v-7  C19,10.896,18.103,10,17,10z M12,18.299c-0.719,0-1.3-0.58-1.3-1.299s0.581-1.301,1.3-1.301s1.3,0.582,1.3,1.301  S12.719,18.299,12,18.299z M14,11h-4V8c0-1.104,0.897-2,2-2s2,0.896,2,2V11z" />
                </svg>
              </div>
              {/* Eye icon for toggling password visibility */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {passwordVisible ? (
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9-4.5s-3 7.5-9 7.5S3 7.5 3 7.5s3-7.5 9-7.5 9 7.5 9 7.5z" />
                  ) : (
                    <path d="M12 4.5C7.305 4.5 3.273 8.057 1.5 12c1.773 3.943 5.805 7.5 10.5 7.5S20.727 15.943 22.5 12C20.727 8.057 16.695 4.5 12 4.5zm0 10.5a3 3 0 100-6 3 3 0 000 6z" />
                  )}
                </svg>
              </div>
            </div>

            {/* <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 block w-full px-10 py-2 border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                Lock icon for Confirm Password 
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M17,10h-1V8c0-2.205-1.794-4-4-4S8,5.795,8,8v2H7c-1.103,0-2,0.896-2,2v7c0,1.104,0.897,2,2,2h10c1.103,0,2-0.896,2-2v-7  C19,10.896,18.103,10,17,10z M12,18.299c-0.719,0-1.3-0.58-1.3-1.299s0.581-1.301,1.3-1.301s1.3,0.582,1.3,1.301  S12.719,18.299,12,18.299z M14,11h-4V8c0-1.104,0.897-2,2-2s2,0.896,2,2V11z" />
                </svg>
              </div>
            </div> */}



            {/* Terms of Service */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>.
              </label>
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-custom-gradient hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Sign Up
              </button>
            </div>
          </form>

          <div className="space-y-4 mt-4">
            {/* Sign-up with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaGoogle className="h-5 w-5 text-gray-600 mr-2" />
              Sign-up With Google
            </button>

            {/* Sign-up with Facebook */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaFacebookF className="h-5 w-5 text-gray-600 mr-2" />
              Sign-up With Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section: Image (only on larger screens) */}
      {/* <div className="hidden md:block md:w-1/2 bg-color">
        <img
          src="../home/signup.png"
          alt="Signup Visual"
          className="object-cover h-full w-full"
        />
      </div> */}
    </div>
  );
};

export default SignUp;
