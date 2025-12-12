import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-brand-pink shadow-sm">
      <h1 className="text-2xl font-bold tracking-tighter text-brand-dark">
        Nashilu's <span className="text-brand-gold">Cosmetics</span>
      </h1>
      <ul className="flex space-x-8 text-brand-dark font-medium">
        <li className="hover:text-brand-gold cursor-pointer">Shop</li>
        <li className="hover:text-brand-gold cursor-pointer">About</li>
        <li className="hover:text-brand-gold cursor-pointer">Cart (0)</li>
      </ul>
      <button className="bg-brand-dark text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
