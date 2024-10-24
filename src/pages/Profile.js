import React, { useState } from 'react';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen  flex flex-col items-center z-[100]">
      {/* Profile Picture Section */}
      <div className="bg-blue-900 rounded-b-3xl w-full max-w-md mx-auto py-10 text-center z-[100]">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex justify-center items-center relative">
          <img
            src={profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label
            htmlFor="profile-picture"
            className="absolute -bottom-1 right-2 bg-pink-500 text-white p-1 rounded-full cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M16.5 2.5a2.121 2.121 0 113 3l-7.036 7.036a4.5 4.5 0 01-2.121 1.121l-3.75.75a1 1 0 01-1.213-1.213l.75-3.75a4.5 4.5 0 011.121-2.121L16.5 2.5z"
              />
            </svg>
          </label>
          <input
            type="file"
            id="profile-picture"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <h3 className=" text-yellow-300 text-xl font-bold mt-4">Complete Your Profile</h3>
        <p className="text-white">Please provide your personal information</p>
      </div>

      {/* Profile Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md mx-auto">
        <div className="space-y-4">
          {/* Age and Phone Number */}
            <div >
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1"
              />
            </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Select Gender
            </label>
            <select
              id="gender"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
            />
          </div>

          {/* Categories */}
          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
              Select Categories
            </label>
            <select
              id="categories"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
          </div>

          {/* Social Channel */}
          <div>
            <label htmlFor="socialChannel" className="block text-sm font-medium text-gray-700">
              Select Social Channel
            </label>
            <select
              id="socialChannel"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
            </select>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label htmlFor="withdrawalMethod" className="block text-sm font-medium text-gray-700">
              Select Withdrawal Method
            </label>
            <select
              id="withdrawalMethod"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Bank Transfer</option>
              <option>PayPal</option>
            </select>
          </div>

          {/* National ID */}
          <div>
            <label htmlFor="nationalID" className="block text-sm font-medium text-gray-700">
              Input your national ID for verification
            </label>
            <input
              type="text"
              id="nationalID"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter national ID"
            />
          </div>
        </div>

        {/* Create Account Button */}
        <button className="w-full mt-6 bg-red-600 text-white py-2 rounded-full text-lg font-semibold hover:bg-red-700">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
