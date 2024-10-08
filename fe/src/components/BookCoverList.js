import React, { useState } from 'react';
import { UilArrowRight } from '@iconscout/react-unicons';
import Login_Image from '../assets/login_Image.png';

const BookCover = ({ title, author, price }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[216px] h-[364px] border-solid border-2 rounded-[20px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={Login_Image} alt="book" className="w-[216px] h-[287px] rounded-t-[20px]" />

      {isHovered && (
        <button className="w-full h-[54px] font-mono absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-lg px-4 mb-2">
          Thêm vào giỏ hàng
        </button>
      )}

      <div className="text-center">
        <p className="text-[20px] font-mono">{title}</p>
        <p className="text-[20px] font-mono text-[#01A268] mt-1">${price}</p>
      </div>
    </div>
  );
};

const BookCoverList = () => (
  <div className="mb-8">
    <div className="flex space-x-6 justify-center overflow-x-auto">
      <BookCover title="Book 1" author="Author 1" price="19.99" />
      <BookCover title="Book 2" author="Author 2" price="24.99" />
      <BookCover title="Book 3" author="Author 3" price="14.99" />
      <BookCover title="Book 4" author="Author 4" price="29.99" />
      <BookCover title="Book 5" author="Author 5" price="22.99" />
    </div>
    <div className="w-full flex justify-end mt-2 text-[#01A268] pointer">
      <a href="#">View all</a>
      <UilArrowRight />
    </div>
  </div>
);

export default BookCoverList;
