import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    // BG: Soft Pink | Text: Dark Charcoal
    <div className="min-h-screen font-sans bg-[#FFF0F3] text-[#1a1a1a]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image: Pink Aesthetic */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Cosmetic Products" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Overlay: Fades to Soft Pink */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF0F3] via-[#FFF0F3]/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <h2 className="text-[#E17688] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
            The Pink Collection
          </h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight text-[#1a1a1a]">
            Introducing <br/>
            <span className="text-[#E17688]">
              Strawberry Moon
            </span>
          </h1>
          
          <p className="text-[#4A4A4A] max-w-lg mx-auto mb-10 text-sm md:text-base tracking-wide font-medium">
            A playful yet sophisticated fragrance that captures the essence of summer.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="bg-[#E17688] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#c05f6f] transition duration-300 shadow-lg"
            >
              Shop Now
            </Link>
            <Link 
              to="/login" 
              className="border border-[#E17688] text-[#E17688] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#E17688] hover:text-white transition duration-300"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#E17688]/20 text-center text-[#E17688] text-xs uppercase tracking-widest bg-[#FFF0F3]">
        <p>&copy; 2024 Nashilus Cosmetics. Luxury Redefined.</p>
      </footer>
    </div>
  );
};

export default Home;