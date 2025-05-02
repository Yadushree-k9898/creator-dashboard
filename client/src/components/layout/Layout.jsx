import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950 min-h-screen font-sans antialiased">
      <Sidebar collapsed={collapsed} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} collapsed={collapsed} />
        <main className="flex-1 p-6 mt-16 overflow-y-auto animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;