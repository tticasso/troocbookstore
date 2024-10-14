import React, { useEffect, useState } from 'react';
import authorPlaceholder from '../assets/author.png'; // Placeholder nếu không có hình ảnh
import topReview from '../assets/topReview.png';
import { UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons';
import axios from 'axios';

const AuthorCard = ({ name, image }) => (
  <div className="w-[221px] h-[270px] flex flex-col items-center">
    <img src={image} alt={name} className="w-[190px] h-[198px] rounded-full object-cover" />
    <p className="text-[24px] leading-[31px] mt-1 font-mono">{name}</p>
  </div>
);

const TopReviewCard = ({ title, author, date, image }) => (
  <div className="flex items-center space-x-4 mb-4">
    <img src={image || authorPlaceholder} alt={title} className="w-[159px] h-[120px] object-cover rounded" />
    <div className='space-y-3'>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-gray-600">{author}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  </div>
);

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const topReviews = [
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
  ];

  useEffect(() => {
    // Gọi API để lấy danh sách tác giả
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/author/list');
        const authorData = response.data.map(author => ({
          name: author.full_name,
          image: `http://localhost:9999/${author.img}` || authorPlaceholder, // Tạo đường dẫn hình ảnh
        }));
        setAuthors(authorData);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []); // Gọi chỉ một lần khi component được mount

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-4xl text-green-600 mb-8">Authors</h2>
      <div className="flex">
        <div className="w-3/4 pr-8">
          <div className="grid grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <AuthorCard key={index} {...author} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button>
              <UilAngleLeftB className="text-green-600" />
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '...', 10].map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  page === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button>
              <UilAngleRightB className="text-green-600" />
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <h3 className="text-xl text-[#01A268] font-semibold mb-4">Top review</h3>
          {topReviews.map((review, index) => (
            <TopReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorList;
