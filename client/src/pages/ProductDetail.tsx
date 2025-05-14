import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [accordionState, setAccordionState] = useState({
    description: true,
    delivery: false,
    returns: false
  });
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentImage(0);
      setSelectedSize('');
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize
    });
    
    navigate('/cart');
  };
  
  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  if (!product) return null;
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative flex-shrink-0 w-20 h-24 border ${
                    currentImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {product.isNew && (
            <span className="inline-block bg-black text-white text-xs px-2 py-1 mb-2">
              NEW
            </span>
          )}
          
          <h1 className="text-2xl font-light">{product.name}</h1>
          <p className="text-xl">${product.price.toFixed(2)}</p>
          
          {/* Size Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium">SIZE: {selectedSize}</p>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-3 text-sm transition ${
                    selectedSize === size
                      ? 'border-black bg-gray-100'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === '' && (
              <p className="text-sm text-gray-500">Please select a size</p>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
          >
            ADD TO BAG
          </Button>
          
          {/* Accordions */}
          <div className="border-t border-gray-200 pt-4 space-y-4">
            {/* Description */}
            <div className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full py-2 text-left"
                onClick={() => toggleAccordion('description')}
              >
                <span className="font-medium">PRODUCT DETAILS</span>
                {accordionState.description ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {accordionState.description && (
                <div className="mt-2 text-sm text-gray-600 space-y-2">
                  <p>{product.description}</p>
                </div>
              )}
            </div>
            
            {/* Delivery */}
            <div className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full py-2 text-left"
                onClick={() => toggleAccordion('delivery')}
              >
                <span className="font-medium">DELIVERY</span>
                {accordionState.delivery ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {accordionState.delivery && (
                <div className="mt-2 text-sm text-gray-600 space-y-2">
                  <p>Standard delivery: 3-5 business days</p>
                  <p>Express delivery: 1-2 business days</p>
                  <p>Free standard shipping on orders over $150</p>
                </div>
              )}
            </div>
            
            {/* Returns */}
            <div className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full py-2 text-left"
                onClick={() => toggleAccordion('returns')}
              >
                <span className="font-medium">RETURNS & EXCHANGES</span>
                {accordionState.returns ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {accordionState.returns && (
                <div className="mt-2 text-sm text-gray-600 space-y-2">
                  <p>Returns and exchanges are accepted within 30 days of purchase.</p>
                  <p>Items must be in original condition with tags attached.</p>
                  <p>For more information, see our returns policy.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;