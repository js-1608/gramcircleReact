import React from 'react';
import { FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
const CampaignCard = ({ campaign }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={`https://localhost:7285/images/${campaign.primaryImage}`}
        alt="Cosmetics"
        className="w-full h-image-custom object-cover"
      />

      {/* Top-left Logo */}
      <div className="absolute top-2 left-2 bg-white rounded-full border shadow-md">
        <img
          src={`https://via.placeholder.com/40`}
          alt="Logo"
          className="w-20 h-20 object-cover rounded-full"
        />
      </div>

      {/* Blue Gradient and Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0038AB] via-transparent to-transparent">
        {/* Price Tag */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-black py-1 px-3 rounded-full font-semibold">
          ${campaign.creatorReward} - ${campaign.creatorRewardDetails}
        </div>

        {/* Text Content */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold leading-tight">
            {campaign.name}
          </h3>
          <div className="flex items-center mt-2">
            <FaInstagram className="mr-2" />
            <FaMapMarkerAlt className="mr-2"/>
            {campaign.criteriaCities}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
