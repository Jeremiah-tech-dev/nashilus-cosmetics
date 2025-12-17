import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Simulate Checkout Process
    const confirm = window.confirm(`Your total is KES ${totalPrice}. Proceed to payment?`);
    if (confirm) {
        alert("Payment Successful! Thank you for your order.");
        clearCart(); // Empty the cart
        navigate('/dashboard'); // Go to dashboard to see "orders" (mock)
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] pt-24 pb-10">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-black uppercase text-[#1a1a1a] mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-400 mb-4">Your cart is empty.</p>
            <button onClick={() => navigate('/shop')} className="bg-[#1a1a1a] text-white px-6 py-3 rounded font-bold uppercase text-xs hover:bg-[#E17688]">
                Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a1a1a]">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-[#E17688] font-bold">KES {item.price * item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-xs font-bold uppercase"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* CHECKOUT SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit border border-[#E17688]/20">
              <h3 className="text-lg font-black uppercase mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">KES {totalPrice}</span>
              </div>
              <div className="flex justify-between mb-6 text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 mb-6 flex justify-between">
                <span className="font-black text-lg">Total</span>
                <span className="font-black text-lg text-[#E17688]">KES {totalPrice}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#1a1a1a] text-white py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#E17688] transition-colors rounded shadow-md"
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;