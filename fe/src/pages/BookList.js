import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UilArrowRight, UilAngleLeftB, UilAngleRightB, UilFilter } from '@iconscout/react-unicons';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

// Hàm để xử lý đường dẫn ảnh
const getImagePath = (imgPath) => {
    if (!imgPath) return '';
    const fileName = imgPath.split('\\').pop();
    return `http://localhost:9999/uploads/${fileName}`;
};

const BookCover = ({ title, price, img, id }) => { // Thêm id vào props
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); // Khởi tạo navigate

    const handleBookClick = () => {
        navigate(`/book_detail/${id}`); // Chuyển tới trang chi tiết của sách
    };

    return (
        <div
            className="relative w-[216px] h-[364px] border-solid border-2 rounded-[20px] flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleBookClick} // Thêm sự kiện click để chuyển trang
        >
            <img 
                src={getImagePath(img)} 
                alt={title} 
                className="w-[216px] h-[287px] rounded-t-[20px] object-cover cursor-pointer" // Thêm cursor-pointer
            />

            {isHovered && (
                <button className="w-full h-[54px] font-mono absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-lg px-4 mb-2">
                    Thêm vào giỏ hàng
                </button>
            )}

            <div className="text-center">
                <p className="text-[20px] font-mono truncate">{title}</p>
                <p className="text-[20px] font-mono text-[#01A268] mt-1">${price}</p>
            </div>
        </div>
    );
};

const BookList = () => {
    const sortOptions = ['Default', 'New Books', 'Price: High - Low', 'Price: Low - High'];
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSort, setSelectedSort] = useState('Default');
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState([]);
    const location = useLocation(); // Hook để lấy query params từ URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search'); // Lấy từ khóa tìm kiếm từ URL

    useEffect(() => {
        axios.get('http://localhost:9999/api/category/list')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axios.get('http://localhost:9999/api/book/list')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
    };

    const handleSortChange = (sort) => {
        setSelectedSort(sort);
    };

    // Sắp xếp sách
    const sortedBooks = [...books].sort((a, b) => {
        if (selectedSort === 'Price: High - Low') return b.price - a.price;
        if (selectedSort === 'Price: Low - High') return a.price - b.price;
        if (selectedSort === 'New Books') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });

    // Lọc sách dựa trên quốc gia và từ khóa tìm kiếm
    const filteredBooks = sortedBooks.filter(book => {
        const matchesCategory = selectedCategories.length === 0 || book.category.some(catId => selectedCategories.includes(catId));
        const matchesSearch = !searchTerm || book.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Our Books</h1>

            <div className="flex mb-6">
                <div className="w-1/4">
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <ul>
                        {categories.map(category => (
                            <li key={category._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={category._id}
                                        checked={selectedCategories.includes(category._id)}
                                        onChange={() => handleCategoryChange(category._id)}
                                    />
                                    {category.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4">
                    <div className="flex justify-between items-center mb-4">
                        <div className='flex'>
                            <UilFilter />
                            <span className="text-gray-600">Sort by:</span>
                        </div>

                        <div className="flex space-x-2">
                            {sortOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleSortChange(option)}
                                    className={`px-3 py-1 rounded ${selectedSort === option ? 'bg-green-600 text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {filteredBooks.map(book => (
                            <BookCover
                                key={book._id}
                                title={book.title}
                                price={book.price}
                                img={book.img}
                                id={book._id}
                            />
                        ))}
                    </div>


                    <div className="flex justify-center items-center mt-8 space-x-2">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>
                            <UilAngleLeftB />
                        </button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '...', 10].map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-green-600 text-white' : 'bg-gray-200'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(prev => prev + 1)}>
                            <UilAngleRightB />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookList;