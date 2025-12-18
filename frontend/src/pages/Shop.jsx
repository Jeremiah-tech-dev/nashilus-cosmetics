import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const CATEGORIES = [
    "All", "Face", "Lips", "Teeth", "Eyes", "Eyelashes", "Brows", "Ear", "Nose", 
    "Body", "Nails", "Toenails", "Hands", "Legs", "Private Areas", 
    "Hair", "Undies", "Body Splash", "Deodorant/Roll-on", 
    "Pads/Tampons", "Tongue"
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#1a1a1a]">
      <Navbar />
      
      <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-center mb-10 text-[#E17688] uppercase tracking-tighter">
          The Collection
        </h1>

        <div className="flex flex-col gap-4 mb-10">
            {/* SEARCH BAR */}
            <input 
                type="text" 
                placeholder="Search for items..." 
                className="w-full p-4 border border-[#E17688]/20 rounded-xl shadow-sm outline-none focus:border-[#E17688]"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* SCROLLABLE CATEGORIES */}
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-2 w-max">
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all border ${
                                selectedCategory === cat 
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-[#E17688] hover:text-[#E17688]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
             <p className="text-xl font-bold">No products found in "{selectedCategory}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;