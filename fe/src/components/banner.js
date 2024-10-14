import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BookCover = ({ src, alt, style }) => (
    <img src={src} alt={alt} className="absolute rounded-lg shadow-lg" style={style} />
);

const Banner = () => {
    const [books, setBooks] = useState([]);
    const [randomBooks, setRandomBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Lưu trữ từ khóa tìm kiếm
    const navigate = useNavigate(); // Hook để điều hướng

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/book/list');
                const data = await response.json();
                setBooks(data);

                // Chọn ngẫu nhiên 3 quyển sách
                const selectedBooks = [];
                while (selectedBooks.length < 3) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const book = data[randomIndex];
                    if (!selectedBooks.includes(book)) {
                        selectedBooks.push(book);
                    }
                }
                setRandomBooks(selectedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Hàm xử lý tìm kiếm
    const handleSearch = () => {
        // Điều hướng đến /book_list với từ khóa tìm kiếm
        navigate(`/book_list?search=${searchTerm}`);
    };

    return (
        <div className="bg-[#F3F1ED] flex items-center justify-center p-4">
            <div className="w-full p-20 flex">
                <div className="flex-1 pr-8 ml-20">
                    <h1 className="text-[64px] leading-[84px] font-serif mb-6 leading-tight">
                        Buy your<br />
                        favorite book<br />
                        for the best price
                    </h1>
                    <div className="flex w-[530px] h-[75px] bg-white">
                        <div className='w-[256px] h-[26px] pl-4 pt-4 pb-4'>
                            <input
                                type="text"
                                placeholder="Search for your book"
                                className="w-[300px] flex-grow px-4 py-2 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            />
                        </div>
                        <div className='w-[152px] h-[45px] pt-4 pb-4 pl-4 ml-20'>
                            <button
                                className="w-[152px] h-[45px] bg-[#01A268] text-white px-6 py-2 hover:bg-green-600 transition duration-300"
                                onClick={handleSearch} // Gọi hàm tìm kiếm khi nhấn nút
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative h-80 mb-10">
                    {randomBooks.map((book, index) => (
                        <BookCover
                            key={book._id}
                            src={`http://localhost:9999/${book.img}`} 
                            alt={book.title || `Book ${index + 1}`} 
                            style={{
                                right: `${(3 - index) * 70}px`,
                                top: `${index * 20}px`,
                                width: '240px',
                                height: `${360 - index * 40}px`,
                                zIndex: 3 - index
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
