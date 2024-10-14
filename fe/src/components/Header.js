import React from 'react';
import { User, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-[#F3F1ED] shadow-sm">
      <div className="w-5/6 container mx-auto px-4 font-mono">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-green-600">
            TroocBookstore
          </div>
          
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-green-600">Home</a></li>
              <li><a href="/shop" className="hover:text-green-600">Shop</a></li>
              <li><a href="/blog" className="hover:text-green-600">Blog</a></li>
              <li><a href="/author" className="hover:text-green-600">Author</a></li>
              <li><a href="/dashboard" className="hover:text-green-600">Dashboard</a></li>
            </ul>
          </nav>
          
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-green-600">
              <User size={24} />
            </button>
            <button className="text-gray-600 hover:text-green-600">
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* <div className="container mx-auto px-4 py-2 text-sm text-gray-600 border-t">
        <a href="/" className="hover:text-green-600">Home</a>
        <span className="mx-2">&gt;</span>
        <span className="text-green-600">Book Review</span>
      </div> */}
    </header>
  );
};

export default Header;