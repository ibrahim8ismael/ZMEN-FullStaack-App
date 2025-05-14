import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Help section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Shop at ZMEN.com</Link></li>
              <li><Link to="#" className="hover:underline">Product</Link></li>
              <li><Link to="#" className="hover:underline">Payment</Link></li>
              <li><Link to="#" className="hover:underline">Shipping</Link></li>
              <li><Link to="#" className="hover:underline">Exchanges and Returns</Link></li>
              <li><Link to="#" className="hover:underline">Shops and Company</Link></li>
              <li><Link to="#" className="hover:underline">Clothes Collection Program</Link></li>
              <li><Link to="#" className="hover:underline">My Account</Link></li>
            </ul>
          </div>

          {/* Follow Us section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Follow Us</h3>
            <ul className="flex space-x-4 mb-4">
              <li>
                <a href="#" className="hover:opacity-70 transition duration-200">
                  <Instagram size={20} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition duration-200">
                  <Facebook size={20} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition duration-200">
                  <Twitter size={20} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition duration-200">
                  <Youtube size={20} />
                </a>
              </li>
            </ul>
            
            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="#" className="hover:underline">Cookies Settings</Link></li>
            </ul>
          </div>

          {/* Company section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Offices</Link></li>
              <li><Link to="#" className="hover:underline">Stores</Link></li>
              <li><Link to="#" className="hover:underline">Work With Us</Link></li>
            </ul>
          </div>

          {/* Newsletter section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe to our newsletter to stay updated with our latest collections and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            © {new Date().getFullYear()} ZMEN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;