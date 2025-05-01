import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading, error: authError, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => {
        if (user?.role === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      })
      .catch((err) => {
        setError(err?.message || 'Login failed');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {(error || authError) && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {error || authError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
