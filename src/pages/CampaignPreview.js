import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

const CampaignPreview = () => {
  // State for FAQ tabs
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg font-sans">
      {/* Header Section with Image and Gradient Overlay */}
      <div className="relative rounded-t-lg">
        <img
          src="https://via.placeholder.com/400x200"
          alt="Cosmetics"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-t-lg">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">
              Global Footsteps - Beauty From Around The World
            </h3>
            <div className="flex items-center mt-1">
              <FaInstagram className="mr-2" />
              Mumbai, Maharashtra
            </div>
          </div>
          <div className="absolute top-2 right-4 bg-yellow-400 text-black py-2 px-4 rounded-full font-semibold">
            $200 - $800
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Brand Name */}
        <div className="mb-4">
          <p className="text-sm font-bold">Brand Name</p>
          <p className="text-gray-700">COSMETICS LOGO</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
            Automotive Technologies
          </span>
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
            Restaurants & Hotels
          </span>
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
            Food & Beverages
          </span>
        </div>

        {/* FAQ Tabs */}
        <div className="mb-4">
          <div className="flex border-b">
            <button
              className={`py-2 px-4 text-sm ${
                activeTab === 'about' ? 'border-b-2 border-yellow-500 font-bold' : ''
              }`}
              onClick={() => setActiveTab('about')}
            >
              About Promotion
            </button>
            <button
              className={`py-2 px-4 text-sm ${
                activeTab === 'collaboration' ? 'border-b-2 border-yellow-500 font-bold' : ''
              }`}
              onClick={() => setActiveTab('collaboration')}
            >
              Collaboration Details
            </button>
          </div>
          <div className="p-4 text-sm text-gray-700">
            {activeTab === 'about' && <p>Details about the promotion go here.</p>}
            {activeTab === 'collaboration' && <p>Details about the collaboration go here.</p>}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-6">
          <p className="text-sm font-bold">Timeline</p>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Sign-up</span>
              <span>10/10/2024 - 25/10/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Product delivery</span>
              <span>10/10/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Posting</span>
              <span>10/10/2024 - 25/10/2024</span>
            </div>
          </div>
        </div>

        {/* Deliverable Tasks */}
        <div className="mb-6">
          <p className="text-sm font-bold">Deliverable Tasks</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-2 text-sm space-y-2">
            <div>Posts - 2</div>
            <div>Reels - 2</div>
            <div>Stories - 4</div>
          </div>
        </div>

        {/* Alerts Section with Custom Checkboxes */}
        <div className="mt-4 bg-gray-50 p-4 border rounded-lg">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="approved"
              className="custom-checkbox"
              checked
              disabled
            />
            <label htmlFor="approved" className="ml-2 text-sm">
              Approved to participate
            </label>
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="voucher"
              className="custom-checkbox"
              checked
              disabled
            />
            <label htmlFor="voucher" className="ml-2 text-sm">
              Voucher Redemption
            </label>
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="event"
              className="custom-checkbox"
              checked
              disabled
            />
            <label htmlFor="event" className="ml-2 text-sm">
              Event Details
            </label>
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="merchandise"
              className="custom-checkbox"
              checked
              disabled
            />
            <label htmlFor="merchandise" className="ml-2 text-sm">
              Brand Merchandise is on the way!
            </label>
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="review"
              className="custom-checkbox"
              checked
              disabled
            />
            <label htmlFor="review" className="ml-2 text-sm">
              Brand Review Content
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
