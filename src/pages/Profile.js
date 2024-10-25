import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/TokenUtils';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    age: '',
    phoneNumber: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    niche: '',
    socialChannel: 'Facebook',
    withdrawalMethod: 'Bank Transfer',
    nationalId: '',
    profileImage: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://localhost:7285/api/users/personal-detail', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        
        // Map gender from number to string
        const genderMap = {
          0: 'Male',
          1: 'Female',
          2: 'Other'
        };

        // Transform the API response to match your form structure
        const transformedData = {
          ...response.data,
          gender: genderMap[response.data.gender] || 'Male', // Default to Male if undefined
          socialChannel: response.data.socialChannel || 'Facebook',
          withdrawalMethod: response.data.withdrawalMethod || 'Bank Transfer'
        };

        setUserDetails(transformedData);
        if (response.data.profileImage) {
          setProfilePicture(response.data.profileImage);
        }
      } catch (error) {
        setError('Failed to fetch user details');
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Transform gender back to number before sending
      const genderMap = {
        'Male': 0,
        'Female': 1,
        'Other': 2
      };

      const dataToSubmit = {
        ...userDetails,
        gender: genderMap[userDetails.gender]
      };

      const response = await axios.post(
        'https://localhost:7285/api/users/personal-detail',
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center z-[100]">
      {error && (
        <div className="w-full max-w-md mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
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
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md mx-auto">
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userDetails.firstName || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userDetails.lastName || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={userDetails.emailId || ''}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userDetails.age}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={userDetails.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Categories */}
          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Select Categories</label>
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
            <label htmlFor="socialChannel" className="block text-sm font-medium text-gray-700">Select Social Channel</label>
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
            <label htmlFor="withdrawalMethod" className="block text-sm font-medium text-gray-700">Select Withdrawal Method</label>
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
            <label htmlFor="nationalID" className="block text-sm font-medium text-gray-700">Input your national ID for verification</label>
            <input
              type="text"
              id="nationalID"
              name="nationalId"
              value={userDetails.nationalId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-full text-lg font-semibold hover:bg-red-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
