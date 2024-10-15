import React from 'react';
import { User, ShoppingCart } from 'lucide-react';

const Header = () => {

  const isLogin = localStorage.getItem('token');
  return (
    <header className="w-full bg-[#F3F1ED] shadow-sm">
      <div className="w-5/6 container mx-auto px-4 font-mono">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-green-600">
            <a href='/'>TroocBookstore</a>

          </div>

          <nav>
            <ul className="flex space-x-6 gap-20 text-[20px] font-bold">
              <li><a href="/book_list" className="hover:text-green-600">Shop</a></li>
              <li><a href="/blog_list" className="hover:text-green-600">Blog</a></li>
              <li><a href="/author_list" className="hover:text-green-600">Author</a></li>
            </ul>
          </nav>

          <div className="flex space-x-4 h-full justify-center items-center">
            <a href='user_profile' className="text-gray-600 hover:text-green-600">
              <User size={24} />
            </a>
            <a href='/cart' className="text-gray-600 hover:text-green-600">
              <ShoppingCart size={24} />
            </a>
            {!isLogin ? (
              <a href='/login'>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Sign in
                </button>
              </a>
            ) : null }


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