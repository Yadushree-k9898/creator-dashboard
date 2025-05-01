import React from 'react';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-600 mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          We are building an exciting platform for users and admins. Please log in or register to get started.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <a href="/login">Login</a>
          </button>
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            <a href="/register">Register</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
