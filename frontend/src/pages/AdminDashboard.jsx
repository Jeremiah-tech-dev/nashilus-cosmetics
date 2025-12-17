import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); 
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  
  // DEFAULT CATEGORY
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Face', image: '' });

  const CATEGORIES = [
      "Face", "Lips", "Teeth", "Eyes", "Eyelashes", "Brows", "Ear", "Nose", 
      "Body", "Nails", "Toenails", "Hands", "Legs", "Private Areas", 
      "Hair", "Undies", "Body Splash", "Deodorant/Roll-on", 
      "Pads/Tampons", "Tongue"
  ];

  // --- FIX: Define this function FIRST (Before useEffect) ---
  const loadData = async () => {
    try {
      const pRes = await fetch('http://localhost:5000/api/products');
      const uRes = await fetch('http://localhost:5000/api/users');
      
      const pData = await pRes.json();
      const uData = await uRes.json();

      setProducts(pData);
      setUsers(uData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  // --- NOW we call useEffect (Since loadData exists above, this works) ---
  useEffect(() => {
    const initDashboard = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Security Check
        if (!user || user.role !== 'admin') {
          navigate('/login');
          return;
        }
        
        // Load Data
        await loadData();
    };
    initDashboard();
  }, [navigate]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        alert("Product Added!");
        setNewProduct({ name: '', price: '', category: 'Face', image: '' });
        loadData(); // Reload the list
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] pt-24 px-6 pb-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-[#E17688] mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('products')} className={`px-6 py-2 rounded font-bold uppercase text-xs tracking-widest ${activeTab === 'products' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-500'}`}>Manage Products</button>
          <button onClick={() => setActiveTab('users')} className={`px-6 py-2 rounded font-bold uppercase text-xs tracking-widest ${activeTab === 'users' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-500'}`}>View Users</button>
        </div>

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ADD FORM */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
              <h2 className="text-lg font-bold uppercase mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input placeholder="Product Name" className="w-full p-2 border rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                <input placeholder="Price (KES)" type="number" className="w-full p-2 border rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                
                {/* CATEGORY DROPDOWN */}
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                    <select 
                        className="w-full p-2 border rounded mt-1" 
                        value={newProduct.category} 
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <input placeholder="Image URL (Optional)" className="w-full p-2 border rounded" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                <button className="w-full bg-[#E17688] text-white py-3 font-bold uppercase text-xs rounded hover:bg-[#1a1a1a]">Add Product</button>
              </form>
            </div>

            {/* PRODUCT LIST */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-bold uppercase mb-4">Current Inventory ({products.length})</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{p.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide text-[#E17688]">{p.category}</p>
                        <p className="text-xs text-gray-400">KES {p.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold uppercase mb-4">Registered Users ({users.length})</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs uppercase text-gray-500">
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-bold">{u.name}</td>
                    <td className="p-3 text-sm">{u.phone}</td>
                    <td className="p-3 text-xs uppercase"><span className={`px-2 py-1 rounded ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;