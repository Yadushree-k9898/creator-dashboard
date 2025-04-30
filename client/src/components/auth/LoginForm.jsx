import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { loginUser } from '../../redux/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(null); // Reset previous error
    setLoading(true); // Set loading state

    const userData = { email, password };

    try {
      // Dispatch login action
      await dispatch(loginUser(userData));

      // Redirect based on user role after successful login
      const { role } = userData;  // Assuming the role is available in userData
      if (role === 'admin') {
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else if (role === 'user') {
        navigate('/user/dashboard'); // Redirect to user dashboard
      } else {
        navigate('/dashboard');  // Default redirect (could be modified as needed)
      }

    } catch (err) {
      console.error("Login error:", err); 
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-lg mx-auto p-8 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-green-600">Welcome Back</h2>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-green-500"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Button
        type="submit"
        className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
