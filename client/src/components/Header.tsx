import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearchClick }) => {
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button and search */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <button 
              onClick={onSearchClick}
              className="p-2 ml-2 hover:bg-gray-100 rounded-full transition duration-200"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-widest uppercase">
              ZMEN
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center ml-10 space-x-8">
              <li>
                <Link to="/shop/new" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  NEW
                </Link>
              </li>
              <li>
                <Link to="/shop/shirts" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  SHIRTS
                </Link>
              </li>
              <li>
                <Link to="/shop/pants" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  PANTS
                </Link>
              </li>
              <li>
                <Link to="/shop/jackets" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  JACKETS
                </Link>
              </li>
              <li>
                <Link to="/shop/shoes" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  SHOES
                </Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="text-sm font-medium hover:opacity-70 transition duration-200">
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="hidden p-2 md:block hover:bg-gray-100 rounded-full transition duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
              aria-label={isAuthenticated ? 'Profile' : 'Login'}
            >
              <User size={20} />
            </button>
            
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;