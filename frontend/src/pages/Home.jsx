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
        )}
      </div>
    </div>
  );
};

export default Home;