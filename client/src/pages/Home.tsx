import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const newProducts = products.filter(product => product.isNew);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Hero Image" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="mb-3 text-4xl font-light md:text-5xl">THE NEW COLLECTION</h1>
          <p className="mb-8 text-xl">Elevate your style with our latest arrivals</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop/new">
              <Button variant="primary">SHOP NEW ARRIVALS</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-light text-center uppercase">Featured Collection</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map(product => (
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
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="outline">VIEW ALL PRODUCTS</Button>
          </Link>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative aspect-[3/4]">
          <img 
            src="https://images.pexels.com/photos/374871/pexels-photo-374871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Shirts" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-10">
            <h3 className="mb-4 text-2xl font-light">SHIRTS</h3>
            <Link to="/shop/shirts">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-20">SHOP NOW</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/4]">
          <img 
            src="https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Pants" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-10">
            <h3 className="mb-4 text-2xl font-light">PANTS</h3>
            <Link to="/shop/pants">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-20">SHOP NOW</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/4]">
          <img 
            src="https://images.pexels.com/photos/878358/pexels-photo-878358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Accessories" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-10">
            <h3 className="mb-4 text-2xl font-light">ACCESSORIES</h3>
            <Link to="/shop/accessories">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-20">SHOP NOW</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-light text-center uppercase">New Arrivals</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newProducts.map(product => (
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
        <div className="mt-12 text-center">
          <Link to="/shop/new">
            <Button variant="outline">VIEW ALL NEW ARRIVALS</Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-16 bg-gray-100">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-light">JOIN OUR NEWSLETTER</h2>
          <p className="mb-6 text-gray-600">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex flex-col md:flex-row gap-2 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              required
            />
            <Button type="submit" variant="primary">SUBSCRIBE</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;