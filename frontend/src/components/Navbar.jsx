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