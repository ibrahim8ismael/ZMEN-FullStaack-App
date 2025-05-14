import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">SEARCH</span>
            <button 
              onClick={() => setSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="border-b border-gray-200 pb-2 mb-8">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full text-xl font-light focus:outline-none"
              autoFocus
            />
          </div>
          <div className="text-sm text-gray-500">
            POPULAR SEARCHES
          </div>
          <div className="mt-2 space-y-2">
            <div className="hover:bg-gray-100 p-2 cursor-pointer">Shirts</div>
            <div className="hover:bg-gray-100 p-2 cursor-pointer">Pants</div>
            <div className="hover:bg-gray-100 p-2 cursor-pointer">Jackets</div>
            <div className="hover:bg-gray-100 p-2 cursor-pointer">Shoes</div>
          </div>
        </div>
      )}

      <Header 
        onMenuClick={() => setMobileMenuOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;