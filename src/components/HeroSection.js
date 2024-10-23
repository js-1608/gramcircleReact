import React from 'react';

const HeroSection = () => {
  return (
    <div className="h-screen bg-color text-white py-12 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between line">
      {/* Left Section: Text */}
      <div className="text-center md:text-left md:w-1/2 ">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-10">
          Unlock Your <span className="text-yellow-400" >Influence Potential: </span>
          Gram Circle's AI-Boosted Partnerships Await!
        </h1>
        <button className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded hover:bg-yellow-500 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Right Section: Phone Images */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div className="flex space-x-4">
          <img
            src="../home/hero_section.png"
            alt="Phone screen 1"
            className="lg:w-96 "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
