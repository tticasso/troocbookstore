import React, { useEffect, useState } from 'react';
import { User, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0); // State cho số lượng hàng trong giỏ hàng
  const isLogin = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:9999/api/cart/count/${userId}`);
        setCartItemCount(response.data.totalQuantity); // Lưu số lượng hàng vào state
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemCount();
  }, [userId]);

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
            <a href='/user_profile' className="text-gray-600 hover:text-green-600">
              <User size={24} />
            </a>
            <a href='/cart' className="relative text-gray-600 hover:text-green-600">
              <ShoppingCart size={24} />
              {/* Hiển thị số lượng hàng trên biểu tượng giỏ hàng */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </a>
            {!isLogin ? (
              <a href='/login'>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Sign in
                </button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
