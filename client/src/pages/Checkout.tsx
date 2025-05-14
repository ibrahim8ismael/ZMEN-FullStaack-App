import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    } else {
      // Place order
      alert('Your order has been placed!');
      clearCart();
      navigate('/');
    }
  };
  
  const goBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-light mb-6 text-center">CHECKOUT</h1>
      
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${
            currentStep === 'shipping' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
          }`}>
            1
          </div>
          <div className="text-sm ml-2">Shipping</div>
        </div>
        <div className="w-16 h-0.5 mx-2 bg-gray-300"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${
            currentStep === 'payment' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
          }`}>
            2
          </div>
          <div className="text-sm ml-2">Payment</div>
        </div>
        <div className="w-16 h-0.5 mx-2 bg-gray-300"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${
            currentStep === 'review' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
          }`}>
            3
          </div>
          <div className="text-sm ml-2">Review</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">SHIPPING INFORMATION</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </div>
                
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="State/Province"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Zip/Postal Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </div>
                
                {!isAuthenticated && (
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                )}
                
                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                  >
                    CONTINUE TO PAYMENT
                  </Button>
                </div>
              </div>
            )}
            
            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">PAYMENT INFORMATION</h2>
                
                <TextField
                  label="Name on Card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
                
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="XXXX XXXX XXXX XXXX"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Expiry Date"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    placeholder="MM/YY"
                  />
                  <TextField
                    label="CVV"
                    name="cardCvv"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    placeholder="XXX"
                  />
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                  >
                    BACK
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                  >
                    REVIEW ORDER
                  </Button>
                </div>
              </div>
            )}
            
            {/* Order Review */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">REVIEW YOUR ORDER</h2>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-sm font-medium mb-2">SHIPPING ADDRESS</h3>
                  <p className="text-sm">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zipCode}<br />
                    {formData.country}<br />
                    {formData.phone}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-sm font-medium mb-2">PAYMENT METHOD</h3>
                  <p className="text-sm">
                    Credit Card ending in {formData.cardNumber.slice(-4)}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">ORDER ITEMS</h3>
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex py-2">
                      <div className="w-16 h-20 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Size: {item.size}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                  >
                    BACK
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 h-fit">
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
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${(totalPrice + (totalPrice * 0.08)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;