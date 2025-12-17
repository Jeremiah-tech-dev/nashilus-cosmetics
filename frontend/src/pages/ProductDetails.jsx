import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products and find the one that matches the ID
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Note: The ID in URL is string, ID in data is number. We use '==' to match loosely or convert.
        const found = data.find(p => p.id == id);
        if (found) {
            setProduct(found);
        } else {
            alert("Product not found");
            navigate('/shop');
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#FFF0F3]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-sm text-gray-500 hover:text-black font-bold uppercase">
            ← Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          {/* LEFT: Image */}
          <div className="h-[400px] md:h-[500px] bg-gray-100 rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit bg-[#E17688]/10 text-[#E17688] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-500 mb-8">KES {product.price}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
                This is a premium product from our {product.category} collection. 
                Designed for elegance and quality, it fits perfectly into your daily routine.
            </p>

            <div className="flex gap-4">
                <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#1a1a1a] text-white py-4 font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-[#E17688] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Add to Cart
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;