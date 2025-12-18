import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Keeps your exact logic for loading the user
  const [user] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

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

    // BG: Soft Pink (#FFF0F3) | Border: Rose (#E17688)
    <nav className="fixed top-0 left-0 w-full bg-[#FFF0F3] border-b border-[#E17688]/20 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
        
        {/* LOGO: Dark Charcoal Text (#1a1a1a) */}
        <Link to="/" className="text-2xl font-black uppercase text-[#1a1a1a] tracking-tighter no-underline">
          Nashilus <span className="text-[#E17688]">Cosmetics</span>
        </Link>

        {/* LINKS: Gray Text (#4A4A4A) with Rose Hover */}
        <div className="flex flex-row items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#4A4A4A]">
          <Link to="/" className="hover:text-[#E17688] transition no-underline">Home</Link>
          <Link to="/shop" className="hover:text-[#E17688] transition no-underline">Shop</Link>
          <Link to="/cart" className="hover:text-[#E17688] transition no-underline">Cart</Link>

          {/* USER SECTION: Pink Accents */}
          {user ? (
            <Link to="/dashboard" className="text-[#E17688] border border-[#E17688] px-4 py-2 rounded hover:bg-[#E17688] hover:text-white transition">
              {user.name}
            </Link>
          ) : (
            <Link to="/login" className="bg-[#E17688] text-white px-4 py-2 rounded hover:bg-[#c05f6f] transition">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;