import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  return (
    <Link 
      to={`/product/${id}`} 
      className="group"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ aspectRatio: '2/3' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-5"></div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-light">{name}</h3>
        <p className="text-sm">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;