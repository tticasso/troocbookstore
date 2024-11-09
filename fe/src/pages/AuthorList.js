import React, { useEffect, useState } from 'react';
import authorPlaceholder from '../assets/author.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthorCard = ({ name, image, authorId }) => {
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    navigate(`/author_detail/${authorId}`);
  };

  return (
    <div className="w-[221px] h-[270px] flex flex-col items-center cursor-pointer" onClick={handleAuthorClick}>
      <img src={image} alt={name} className="w-[190px] h-[198px] rounded-full object-cover" />
      <p className="text-[24px] leading-[31px] mt-1 font-mono truncate max-w-[250px]">{name}</p>
    </div>
  );
};

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const location = useLocation();

  const normalizeText = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/\s+/g, "") // Loại bỏ tất cả khoảng trắng thừa
      .trim();
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/author/list');
        const authorData = response.data.map(author => ({
          name: author.full_name,
          image: `http://localhost:9999/${author.img}` || authorPlaceholder,
          authorId: author._id,
        }));
        
        // Lọc tác giả dựa trên từ khóa tìm kiếm
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search') || '';

        const normalizedSearchTerm = normalizeText(searchTerm);

        const filteredAuthors = authorData.filter(author =>
          normalizeText(author.name).includes(normalizedSearchTerm)
        );

        setAuthors(filteredAuthors);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-4xl text-green-600 mb-8">Authors</h2>
      <div className="grid grid-cols-4 gap-6">
        {authors.length > 0 ? (
          authors.map((author, index) => <AuthorCard key={index} {...author} />)
        ) : (
          <p>No authors found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorList;
