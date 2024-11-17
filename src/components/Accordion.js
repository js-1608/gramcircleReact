import React, { useState } from 'react';

const Accordion = ({ campaign }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const accordionData = [
    {
      title: 'About Promotion',
      content: campaign?.aboutPromotion || 'N/A',
    },
    {
      title: 'Collaboration Details',
      content: campaign?.collaborationDetails || 'N/A',
    },
    {
      title: 'Teams of Collaboration',
      content: campaign?.termsOfCollaboration || 'N/A',
    },
  ];

  return (
    <div className="w-full">
      {accordionData.map((item, index) => (
        <div
          key={index}
          className={`py-2 mb-2 rounded-lg transition-all ${
            activeIndex === index ? 'border-2 border-yellow-400' : 'border-2 border-transparent'
          }`}
        >
          <div
            className="font-semibold cursor-pointer flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span
              className={`transform transition-transform ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            >
              ^
            </span>
          </div>
          {activeIndex === index && (
            <div className="mt-2 p-2 rounded">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
