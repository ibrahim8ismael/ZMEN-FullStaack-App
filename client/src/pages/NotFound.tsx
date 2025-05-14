import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
      <h1 className="text-4xl font-light mb-4">404</h1>
      <p className="text-xl mb-8">We can't find the page you're looking for.</p>
      <div className="space-y-4">
        <Link to="/">
          <Button variant="primary">GO TO HOMEPAGE</Button>
        </Link>
        <div>
          <Link to="/shop" className="text-sm underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;