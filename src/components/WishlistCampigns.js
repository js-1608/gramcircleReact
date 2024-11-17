import React from "react";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const WishlistCampagin = ({ campaign, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(campaign.campaignId); // Call the delete function with the campaign ID
    }
  };

  return (
    <div className="relative max-w-lg mx-auto my-4 p-4 border-2 border-yellow-400 rounded-lg shadow-md">
      {/* Trash Icon at the top-right corner */}
      <FaTrash
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-500"
        onClick={handleDelete} // Attach the delete handler
      />

      <div className="flex items-center space-x-4">
        {/* Image Section */}
        <img
          src={campaign.image} // Use the image URL from props
          alt="Campaign"
          className="w-20 h-20 rounded-md object-cover"
        />

        {/* Content Section */}
        <div className="flex-grow">
          <h2 className="text-md text-gray-900">
            {campaign.name}
          </h2>
          <p className="text-xl font-bold text-gray-800 mt-1 mb-2">{campaign.creatorReward}</p>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <img src={campaign.logo} className="w-[15px] rounded-full" />
            <img src="../header_icons/INSTAGRAM.png" className="w-[15px] " />
            <FaMapMarkerAlt />
            <span className="">{campaign.criteriaCities}</span>
          </div>
        </div>
        <button className="relative lg-absolute bottom-0 right-0 py-2 px-6 bg-yellow-400 text-white font-bold rounded-full text-sm">
            {campaign.campaignStatus}
        </button>
      </div>
    </div>
  );
};

export default WishlistCampagin;
