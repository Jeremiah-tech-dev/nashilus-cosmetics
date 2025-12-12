import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-brand-pink">
      <div className="flex flex-col items-center justify-center text-center h-[80vh] px-4">
        <h2 className="text-sm font-bold tracking-widest text-brand-gold uppercase mb-4">
          The New Standard
        </h2>
        <h1 className="text-6xl md:text-8xl font-bold text-brand-dark mb-6">
          Beauty, <br /> Simplified.
        </h1>
        <p className="text-gray-600 max-w-lg mb-8 text-lg">
          Discover a curated collection of premium cosmetics designed for your unique skin tone. Fast, simple, and personal.
        </p>
        <div className="flex space-x-4">
          <button className="bg-brand-dark text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition">
            Shop Collection
          </button>
          <button className="border border-brand-dark text-brand-dark px-8 py-3 rounded-full text-lg hover:bg-white transition">
            Find My Shade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
