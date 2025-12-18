
import React from 'react';
import bgImage from '../bg.png';
import WhyDanglia from '../components/WhyDanglia';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div className="w-full min-h-screen" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* Navbar */}
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
      
      <div className="px-8 md:px-16 flex items-center justify-center min-h-[calc(100vh-120px)]">
      


      {/* RIGHT COLUMN: Text Content */}
      <div className="max-w-md space-y-6 text-center ml-auto mr-64">
        
        <div className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
          {'NASHILUS COSMETICS'.split('').map((letter, index) => (
            <span 
              key={index} 
              className="inline-block animate-bounce" 
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.6s',
                animationIterationCount: '1',
                animationFillMode: 'forwards'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          BEAUTY THAT  TURNS
          HEADS<br/>
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
          Indulge in luxurious cosmetics designed to elevate your glow, boost confidence, and make every moment unforgettable.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center lg:justify-start space-x-8 pt-4 font-medium text-sm">
            <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition duration-300">
              START SHOPPING
            </button>
            <button className="text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition">
              see our offers
            </button>
        </div>
    <div className="min-h-screen bg-[#fafafa]">
      {/* HEADER SECTION */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-black text-[#1a1a1a] mb-2 uppercase tracking-wide">
          Our Collection
        </h2>
        <div className="w-20 h-1 bg-[#E17688] mb-8"></div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 animate-pulse">Loading amazing products...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-bold">Oops! Could not load products.</p>
            <p className="text-sm text-gray-400 mt-2">Is the backend server running?</p>
          </div>
        )}

        {/* PRODUCT GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
     }]
      </div>
      
      {/* Right Side Pagination/Slider Dots (Visual only) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col space-y-4 text-xs font-bold text-gray-400">
        <span>01</span>
        <span className="text-gray-900">02</span>
        <span>03</span>
        <span>04</span>
      </div>

      </div>
    </div>
    
    {/* Why Danglia Section */}
    <WhyDanglia />
    </>
  );
};

export default Home;