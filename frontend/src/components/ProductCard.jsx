import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* IMAGE SECTION */}
      <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Quick Badge for Category */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
            {product.category}
        </span>
      </Link>

      {/* INFO SECTION */}
      <div className="p-5 text-center">
        <Link to={`/product/${product.id}`}>
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