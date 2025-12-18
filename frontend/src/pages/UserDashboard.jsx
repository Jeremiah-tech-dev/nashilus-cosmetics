import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // We define the logic inside a standard function to avoid "Synchronous" errors
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          // Parse safely
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // If no user found, redirect
          navigate('/login');
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        navigate('/login');
      }
    };

    // Call the function immediately
    checkUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Prevent crash if user is still loading
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF0F3] pt-24 text-center">
        <Navbar />
        <div className="mt-10 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-[#E17688] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#1a1a1a] pt-24 pb-10">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E17688]/20 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase text-[#1a1a1a]">
              Hello, <span className="text-[#E17688]">{user.name || "User"}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Welcome to your personal dashboard.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-gray-100 text-red-400 px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PROFILE INFO */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E17688]/10">
            <h2 className="text-lg font-black uppercase mb-6 border-b border-gray-100 pb-2">My Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-gray-400">Full Name</label>
                <p className="font-bold text-lg">{user.name}</p>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-gray-400">Email Address</label>
                <p className="font-bold text-lg">{user.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-gray-400">Phone</label>
                  <p className="font-bold text-lg">{user.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-gray-400">Country</label>
                  <p className="font-bold text-lg">{user.country || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E17688]/10 opacity-70">
            <h2 className="text-lg font-black uppercase mb-6 border-b border-gray-100 pb-2">Recent Orders</h2>
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm mb-4">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-[#E17688] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;