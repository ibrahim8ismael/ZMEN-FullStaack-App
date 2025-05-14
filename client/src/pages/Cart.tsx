import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-light mb-6">SHOPPING BAG</h1>
        <p className="mb-8">Your shopping bag is empty.</p>
        <Link to="/shop">
          <Button variant="primary">CONTINUE SHOPPING</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-light mb-6 text-center">SHOPPING BAG</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex border-b border-gray-200 pb-6">
              {/* Product Image */}
              <div className="w-24 h-32 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="ml-4 flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    <p className="text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-gray-500 hover:text-black transition"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="p-1 border border-gray-300 hover:border-black transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="p-1 border border-gray-300 hover:border-black transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div>
            <Link to="/shop">
              <Button variant="outline">CONTINUE SHOPPING</Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-6">
          <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <Link to="/checkout">
            <Button variant="primary" fullWidth>
              CHECKOUT
            </Button>
          </Link>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>We accept:</p>
            <div className="flex gap-2 mt-2">
              <div className="w-10 h-6 bg-gray-300 rounded"></div>
              <div className="w-10 h-6 bg-gray-300 rounded"></div>
              <div className="w-10 h-6 bg-gray-300 rounded"></div>
              <div className="w-10 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;