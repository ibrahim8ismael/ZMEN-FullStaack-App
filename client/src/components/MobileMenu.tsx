import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="flex justify-between items-center p-4">
        <span className="text-sm text-gray-500">MENU</span>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="px-4 py-6">
        <ul className="space-y-6 text-lg">
          <li>
            <Link 
              to="/shop/new" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              NEW
            </Link>
          </li>
          <li>
            <Link 
              to="/shop/shirts" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              SHIRTS
            </Link>
          </li>
          <li>
            <Link 
              to="/shop/pants" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              PANTS
            </Link>
          </li>
          <li>
            <Link 
              to="/shop/jackets" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              JACKETS
            </Link>
          </li>
          <li>
            <Link 
              to="/shop/shoes" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              SHOES
            </Link>
          </li>
          <li>
            <Link 
              to="/shop/accessories" 
              onClick={onClose}
              className="block py-2 hover:opacity-70 transition duration-200"
            >
              ACCESSORIES
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        <ul className="px-4 py-6 space-y-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/profile" 
                  onClick={onClose}
                  className="block text-sm hover:opacity-70 transition duration-200"
                >
                  MY ACCOUNT
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="block text-sm text-red-500 hover:opacity-70 transition duration-200"
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                onClick={onClose}
                className="block text-sm hover:opacity-70 transition duration-200"
              >
                LOGIN / CREATE ACCOUNT
              </Link>
            </li>
          )}
          <li>
            <Link 
              to="/cart" 
              onClick={onClose}
              className="block text-sm hover:opacity-70 transition duration-200"
            >
              SHOPPING BAG
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;