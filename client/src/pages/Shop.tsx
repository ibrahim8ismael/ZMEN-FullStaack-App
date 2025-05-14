import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { ChevronDown } from 'lucide-react';

const Shop: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category if specified
    if (category) {
      if (category === 'new') {
        result = result.filter(product => product.isNew);
      } else {
        result = result.filter(product => product.category === category);
      }
    }
    
    // Apply sorting
    result = applySorting(result, sortOption);
    
    setFilteredProducts(result);
  }, [category, sortOption]);
  
  const applySorting = (items: typeof products, option: string) => {
    const productsCopy = [...items];
    
    switch (option) {
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        // Assuming newer products have higher IDs
        return productsCopy.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const getCategoryTitle = () => {
    if (!category) return 'All Products';
    
    switch (category) {
      case 'new': return 'New Arrivals';
      case 'shirts': return 'Shirts';
      case 'pants': return 'Pants';
      case 'jackets': return 'Jackets';
      case 'shoes': return 'Shoes';
      case 'accessories': return 'Accessories';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-light mb-8 text-center uppercase">{getCategoryTitle()}</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        {/* Filters - Mobile Accordion */}
        <div className="w-full md:w-64 md:block">
          <div className="border-t border-b border-gray-200 py-4 md:border-0 md:py-0">
            <button 
              className="flex justify-between items-center w-full text-left md:hidden"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="text-sm font-medium">FILTER & SORT</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div className={`mt-4 space-y-6 md:block ${filterOpen ? 'block' : 'hidden'}`}>
              {/* Sort Options - Mobile */}
              <div className="md:hidden">
                <h3 className="text-sm font-medium mb-2">SORT BY</h3>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full p-2 border border-gray-300 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">CATEGORY</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/shop/new" className={`text-sm hover:opacity-70 transition ${category === 'new' ? 'font-medium' : ''}`}>
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a href="/shop/shirts" className={`text-sm hover:opacity-70 transition ${category === 'shirts' ? 'font-medium' : ''}`}>
                      Shirts
                    </a>
                  </li>
                  <li>
                    <a href="/shop/pants" className={`text-sm hover:opacity-70 transition ${category === 'pants' ? 'font-medium' : ''}`}>
                      Pants
                    </a>
                  </li>
                  <li>
                    <a href="/shop/jackets" className={`text-sm hover:opacity-70 transition ${category === 'jackets' ? 'font-medium' : ''}`}>
                      Jackets
                    </a>
                  </li>
                  <li>
                    <a href="/shop/shoes" className={`text-sm hover:opacity-70 transition ${category === 'shoes' ? 'font-medium' : ''}`}>
                      Shoes
                    </a>
                  </li>
                  <li>
                    <a href="/shop/accessories" className={`text-sm hover:opacity-70 transition ${category === 'accessories' ? 'font-medium' : ''}`}>
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Size Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">SIZE</h3>
                <div className="grid grid-cols-4 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36'].map(size => (
                    <button
                      key={size}
                      className="border border-gray-300 py-1 text-xs hover:border-black transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sort Options - Desktop */}
        <div className="hidden md:flex items-center ml-auto">
          <label htmlFor="sort-select" className="text-sm mr-2">SORT BY:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-light">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              category={product.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;