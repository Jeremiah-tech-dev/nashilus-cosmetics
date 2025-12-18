import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // FIX 1: Handle both MongoDB "_id" and normal "id"
  const productId = product._id || product.id;

  // FIX 2: Handle broken images
  // We use state to track the image. If it fails, we swap it for a placeholder.
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleImageError = () => {
    // If the image fails to load (404 or blocked), use this placeholder
    setImgSrc("https://placehold.co/600x600/f3f4f6/E17688?text=No+Image");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* IMAGE SECTION */}
      <Link to={`/product/${productId}`} className="block relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={imgSrc} 
          alt={product.name} 
          onError={handleImageError} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Quick Badge for Category */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
            {product.category}
        </span>
      </Link>

      {/* INFO SECTION */}
      <div className="p-5 text-center">
        <Link to={`/product/${productId}`}>
            <h3 className="font-bold text-lg text-[#1a1a1a] mb-1 hover:text-[#E17688] transition-colors">
            {product.name}
            </h3>
        </Link>
        <p className="text-[#E17688] font-bold text-sm mb-4">KES {product.price}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#1a1a1a] text-white py-3 text-xs font-bold uppercase tracking-widest rounded hover:bg-[#E17688] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;