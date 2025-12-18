import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 md:px-16 w-full bg-transparent">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        Nashilus Cosmetics
      </div>

      <div className="flex items-center space-x-8">
        {/* Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
          <li className="text-black cursor-pointer">Home</li>
          <li className="hover:text-pink-500 cursor-pointer transition">About</li>
          <li className="hover:text-pink-500 cursor-pointer transition">Beauty Products</li>
          <li className="hover:text-pink-500 cursor-pointer transition">Contact</li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-white/80 backdrop-blur-md border border-[#de8c9d] text-[#de8c9d] px-6 py-2 rounded-3xl font-medium hover:bg-[#de8c9d] hover:text-white hover:scale-105 transition-all duration-300 shadow-lg">
            Sign Up
          </button>
          <button className="bg-[#de8c9d] text-white px-6 py-2 rounded-3xl font-medium hover:bg-[#d67b8f] hover:scale-105 transition-all duration-300 shadow-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;