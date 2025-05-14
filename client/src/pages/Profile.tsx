import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';

const orderHistory = [
  {
    id: '10002',
    date: '2023-11-15',
    total: 229.80,
    status: 'Delivered',
    items: [
      { name: 'Slim Fit Oxford Shirt', quantity: 1, price: 49.90 },
      { name: 'Relaxed Fit Wool Blend Pants', quantity: 1, price: 79.90 },
      { name: 'Silk Twill Pocket Square', quantity: 1, price: 29.90 },
      { name: 'Leather Minimalist Watch', quantity: 1, price: 129.90 }
    ]
  },
  {
    id: '10001',
    date: '2023-09-28',
    total: 149.90,
    status: 'Delivered',
    items: [
      { name: 'Leather Chelsea Boots', quantity: 1, price: 149.90 }
    ]
  }
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'orders'>('account');
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-light mb-8 text-center">MY ACCOUNT</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex max-w-md mx-auto">
          <button
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'account' 
                ? 'border-b-2 border-black' 
                : 'text-gray-500 hover:text-black'
            }`}
            onClick={() => setActiveTab('account')}
          >
            ACCOUNT DETAILS
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'orders' 
                ? 'border-b-2 border-black' 
                : 'text-gray-500 hover:text-black'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            ORDER HISTORY
          </button>
        </div>
      </div>
      
      {/* Account Details */}
      {activeTab === 'account' && (
        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="First Name"
                name="firstName"
                defaultValue={user.name.split(' ')[0]}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                defaultValue={user.name.split(' ').slice(1).join(' ')}
                fullWidth
              />
            </div>
            
            <TextField
              label="Email"
              type="email"
              name="email"
              defaultValue={user.email}
              fullWidth
              disabled
            />
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              
              <div className="space-y-4">
                <TextField
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  fullWidth
                />
                <TextField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  fullWidth
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  fullWidth
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                variant="primary"
              >
                UPDATE PROFILE
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                LOGOUT
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {/* Order History */}
      {activeTab === 'orders' && (
        <div>
          {orderHistory.length === 0 ? (
            <div className="text-center py-12">
              <p className="mb-4">You haven't placed any orders yet.</p>
              <Button 
                variant="primary"
                onClick={() => navigate('/shop')}
              >
                START SHOPPING
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {orderHistory.map(order => (
                <div key={order.id} className="border border-gray-200 rounded overflow-hidden">
                  <div className="bg-gray-50 p-4 sm:flex sm:justify-between sm:items-center">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Order #:</span> {order.id}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm">
                        <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span> {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium mb-3">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;