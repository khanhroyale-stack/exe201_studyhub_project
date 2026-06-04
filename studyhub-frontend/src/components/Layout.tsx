import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-[72px]">
        <Outlet />
      </div>

      {/* Global Support FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <span className="material-symbols-outlined text-2xl">chat</span>
        <span className="absolute right-full mr-3 bg-on-surface text-surface px-3 py-1.5 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg">
          Hỗ trợ trực tuyến
        </span>
      </button>

      <Footer />
    </div>
  );
};

export default Layout;
