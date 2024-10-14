import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UilArrowRight } from '@iconscout/react-unicons';
import axios from 'axios';

const BookCover = ({ book }) => {
  const { _id, title, price, img } = book;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const user_id = localStorage.getItem('userId');
  // Hàm để xử lý đường dẫn ảnh
  const getImagePath = (imgPath) => {
    if (!imgPath) return '';
    const fileName = imgPath.split('\\').pop(); // Lấy tên file từ đường dẫn
    return `http://localhost:9999/uploads/${fileName}`; // Tạo đường dẫn đầy đủ dựa trên URL máy chủ
  };

  // Hàm xử lý khi nhấn vào phần thông tin sách
  const handleNavigateToDetail = () => {
    navigate(`/book_detail/${_id}`); // Điều hướng tới trang chi tiết sách
  };

  // Hàm xử lý khi nhấn "Add to cart"
  const handleAddToCart = async () => {
    const body = {
      user_id: user_id, // Thay thế bằng user_id thực tế nếu có
      book_id: _id,
      quantity: 1,
    };

    try {
      const response = await axios.post('http://localhost:9999/api/cart/add', body);
      console.log('Add to cart success:', response.data);
      alert('Book added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart.');
    }
  };

  return (
    <div
      className="relative w-[216px] h-[364px] border-solid border-2 rounded-[20px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Khi nhấn vào thông tin sách (trừ nút thêm vào giỏ hàng) sẽ chuyển hướng */}
      <div onClick={handleNavigateToDetail} className="cursor-pointer">
        <img 
          src={getImagePath(img)} 
          alt={title} 
          className="w-[216px] h-[287px] rounded-t-[20px] object-cover" 
        />
      </div>

      {isHovered && (
        <button 
          className="w-full h-[54px] font-mono absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 mb-2"
          onClick={handleAddToCart} // Thêm sự kiện onClick để gửi request
        >
          Add to cart
        </button>
      )}

      <div className="text-center" onClick={handleNavigateToDetail}>
        <p className="text-[20px] font-mono truncate px-2 cursor-pointer">{title}</p>
        <p className="text-[20px] font-mono text-[#01A268] mt-1 cursor-pointer">${price}</p>
      </div>
    </div>
  );
};

const BookCoverList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/book/list');
        setBooks(response.data.slice(0, 5)); // Lấy 5 quyển sách đầu tiên
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mb-8 w-5/7">
      <div className="flex space-x-6 justify-center overflow-x-auto">
        {books.map((book) => (
          <BookCover
            key={book._id}
            book={book} // Truyền toàn bộ object book
          />
        ))}
      </div>
      <div className="flex justify-end mt-2 text-[#01A268] pointer">
        <a href="/book_list">View all</a>
        <UilArrowRight />
      </div>
    </div>
  );
};

export default BookCoverList;
