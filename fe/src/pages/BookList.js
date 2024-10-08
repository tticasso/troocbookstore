import React, { useState } from 'react';
import { UilArrowRight, UilAngleLeftB, UilAngleRightB, UilFilter } from '@iconscout/react-unicons';
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
                <p className="text-[20px] font-mono truncate">{title}</p>
                <p className="text-[20px] font-mono text-[#01A268] mt-1">${price}</p>
            </div>
        </div>
    );
};

const BookList = () => {
    const nations = ['Viet Nam', 'China', 'Japan', 'France', 'Germany', 'Korea', 'Italy', 'America'];
    const sortOptions = ['Default', 'New Books', 'Price: High - Low', 'Price: Low - High'];
    const [selectedNations, setSelectedNations] = useState([]);
    const [selectedSort, setSelectedSort] = useState('Default');
    const [currentPage, setCurrentPage] = useState(1);

    const handleNationChange = (nation) => {
        setSelectedNations(prev =>
            prev.includes(nation) ? prev.filter(n => n !== nation) : [...prev, nation]
        );
    };

    const handleSortChange = (sort) => {
        setSelectedSort(sort);
    };

    const books = [
        { title: "Dai Nam Di Truyen", price: "78.000" },
        { title: "Ha Noi Thoi Cam Dat", price: "78.000" },
        { title: "Cay Cam Ngot Cua Toi", price: "78.000" },
        { title: "Lau Dai Tren May", price: "78.000" },
        // ... add more books as needed
    ];

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Our Books</h1>

            <div className="flex mb-6">
                <div className="w-1/4 pr-4">
                    <h2 className="text-xl font-semibold mb-2 text-green-600">Nation</h2>
                    {nations.map(nation => (
                        <div key={nation} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={nation}
                                checked={selectedNations.includes(nation)}
                                onChange={() => handleNationChange(nation)}
                                className="mr-2"
                            />
                            <label htmlFor={nation}>{nation}</label>
                        </div>
                    ))}
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

                    <div className="grid grid-cols-4 gap-6 mb-10">
                        {books.map((book, index) => (
                            <BookCover key={index} title={book.title} price={book.price} />
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-6 mb-10">
                        {books.map((book, index) => (
                            <BookCover key={index} title={book.title} price={book.price} />
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-6 mb-10">
                        {books.map((book, index) => (
                            <BookCover key={index} title={book.title} price={book.price} />
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-6 mb-10">
                        {books.map((book, index) => (
                            <BookCover key={index} title={book.title} price={book.price} />
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