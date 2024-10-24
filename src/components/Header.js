import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-color text-white py-4 px-6 md:px-12 flex justify-between items-center">
      {/* Left Section: Logo */}
      <div className="text-2xl font-bold">
        <a href="/" className="flex items-center">
          <img
            src="./logo.png"
            alt="Logo"
            className="h-1/2 w-1/2 mr-2"
          />
        </a>
      </div>

      {/* Right Section: Login/Signup Buttons */}
      <div className="hidden md:flex space-x-4">
        <a
          href="/login"
          className="bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-2 px-4 rounded hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
        >
          Login
        </a>
        <a
          href="/signup"
          className="bg-yellow-400 text-blue-900 font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
        >
          Sign Up
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden ">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
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
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 bg-blue-900 w-full px-6 py-4 md:hidden z-[1000]">
          <a
            href="/login"
            className="block text-yellow-400 py-2 px-4 rounded hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
          >
            Login
          </a>
          <a
            href="/signup"
            className="block bg-yellow-400 text-blue-900 py-2 px-4 mt-2 rounded hover:bg-yellow-500 transition duration-300"
          >
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
