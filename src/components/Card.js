import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Card = ({ card }) => {
  // Check if card is defined, and provide a fallback

  console.log(card); // getting undefined.
  
  if (!card) {
    return <div className="w-72 h-96 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative w-72 h-96 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${card.primaryImage || 'defaultImage.jpg'})` }}>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold py-1 px-2 rounded-lg">
          {card.creatorReward}
        </div>

        {/* Content */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-semibold mb-1">{card.name}</h3>

          {/* Location */}
          <div className="flex items-center text-sm text-white/80 mb-4">
            <FaMapMarkerAlt className="mr-1" />
            <span>{card.criteriaCities}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
