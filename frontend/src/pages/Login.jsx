import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Kenya',
    password: '',
    confirmPassword: ''
  });

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let bodyData;
    let endpoint;

    if (isLogin) {
        endpoint = '/api/login';
        bodyData = { identifier: loginIdentifier, password: formData.password };
    } else {
        endpoint = '/api/register';
        bodyData = formData;
    }

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(isLogin ? "Welcome back!" : "Account Created Successfully!");
        if (data.user.email === 'admin@nashilus.com') {
          navigate('/admin-dashboard');
        } else {
          navigate('/shop');
        }
        window.location.reload(); 
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#1a1a1a] pt-24 px-6 flex justify-center items-center pb-10">
      <Navbar />
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E17688]/20 w-full max-w-md relative z-10">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black uppercase text-[#E17688]">
            {isLogin ? 'Welcome Back' : 'Join Nashilus'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-xs font-bold mb-4 text-center">
            {error}
          </div>
        )}

        {/* Added autoComplete="off" to the form to discourage browser popups */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {/* REGISTER FIELDS */}
          {!isLogin && (
            <>
              <div>
                <label className="text-xs uppercase font-bold text-gray-500">Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
                  onChange={handleChange} 
                  required 
                  autoComplete="name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-gray-500">Phone Number</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      placeholder="07..." 
                      className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
                      onChange={handleChange} 
                      required 
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-gray-500">Country</label>
                    <select name="country" className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" onChange={handleChange} value={formData.country}>
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="South Africa">South Africa</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-gray-500">Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
                  onChange={handleChange} 
                  required 
                  autoComplete="email" 
                />
              </div>
            </>
          )}

          {/* LOGIN FIELD (Combined) */}
          {isLogin && (
             <div>
                <label className="text-xs uppercase font-bold text-gray-500">Email OR Phone Number</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
                    onChange={(e) => setLoginIdentifier(e.target.value)} 
                    required 
                    autoComplete="username"
                />
             </div>
          )}

          {/* PASSWORD FIELDS */}
          <div>
            <label className="text-xs uppercase font-bold text-gray-500">Password</label>
            <input 
              name="password" 
              type="password" 
              className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
              onChange={handleChange} 
              required 
              // Important: 'new-password' stops the browser from suggesting old logins here
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {!isLogin && (
            <div>
                <label className="text-xs uppercase font-bold text-gray-500">Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  className="w-full mt-1 p-3 border border-gray-200 rounded text-sm outline-none focus:border-[#E17688]" 
                  onChange={handleChange} 
                  required 
                  autoComplete="new-password"
                />
            </div>
          )}

          <button className="w-full bg-[#1a1a1a] text-white py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#E17688] transition-colors rounded shadow-md mt-4">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            {isLogin ? "New to Nashilus?" : "Already have an account?"}{" "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-bold text-[#E17688] underline uppercase tracking-wider ml-1"
            >
              {isLogin ? "Register Here" : "Login Here"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;