import React, { useState, useEffect } from 'react';
import { UilArrowRight } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const AuthorAvatar = ({ name, image, authorId }) => { // Thêm authorId vào props
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm để xử lý đường dẫn ảnh
  const getImagePath = (imgPath) => {
    if (!imgPath) return '';
    const fileName = imgPath.split('\\').pop(); // Lấy tên file từ đường dẫn
    return `http://localhost:9999/uploads/${fileName}`; // Tạo đường dẫn đầy đủ dựa trên URL máy chủ
  };

  const handleAuthorClick = () => {
    navigate(`/author_detail/${authorId}`); // Chuyển tới trang chi tiết của tác giả
  };

  return (
    <div className="w-[221px] h-[270px] flex flex-col items-center">
      <img
        src={getImagePath(image)}
        alt={name}
        className="w-[221px] h-[221px] rounded-full object-cover cursor-pointer" // Thêm cursor-pointer
        onClick={handleAuthorClick} // Thêm sự kiện click để chuyển trang
      />
      <p className="text-[24px] leading-[31px] mt-1 font-mono truncate max-w-[200px]">{name}</p>
    </div>
  );
};


const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/author/list');
        setAuthors(response.data.slice(0, 5)); // Lấy 5 tác giả đầu tiên
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-[50px] mb-4 text-center leading-[84px]">Authors</h2>
      <div className="flex space-x-6 justify-center overflow-x-auto">
        {authors.map((author) => (
          <AuthorAvatar
            key={author._id}
            name={author.full_name}
            image={author.img} // Đường dẫn ảnh từ API
            authorId={author._id} // Thêm authorId vào props
          />
        ))}

      </div>
      <div className='flex justify-end mx-auto mr-44 mt-2 text-[#01A268] pointer'>
        <a href='/author_list'>View all</a>
        <UilArrowRight />
      </div>
    </div>
  );
};

export default AuthorList;
