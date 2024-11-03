import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const normalizeText = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
};

const BookCover = ({ src, alt, style }) => (
    <img src={src} alt={alt} className="absolute rounded-lg shadow-lg" style={style} />
);

const Banner = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [randomBooks, setRandomBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooksAndAuthors = async () => {
            try {
                const booksResponse = await fetch('http://localhost:9999/api/book/list');
                const authorsResponse = await fetch('http://localhost:9999/api/author/list');
                const booksData = await booksResponse.json();
                const authorsData = await authorsResponse.json();

                setBooks(booksData);
                setAuthors(authorsData);

                const selectedBooks = [];
                while (selectedBooks.length < 3 && booksData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * booksData.length);
                    const randomBook = booksData[randomIndex];
                    if (!selectedBooks.includes(randomBook)) {
                        selectedBooks.push(randomBook);
                    }
                }
                setRandomBooks(selectedBooks);
            } catch (error) {
                console.error('Error fetching books and authors:', error);
            }
        };

        fetchBooksAndAuthors();
    }, []);

    const handleSearch = () => {
        const normalizedSearchTerm = normalizeText(searchTerm);

        // Kiểm tra trong danh sách sách trước
        const matchingBook = books.some(book => 
            normalizeText(book.title).includes(normalizedSearchTerm)
        );

        // Kiểm tra trong danh sách tác giả
        const matchingAuthor = authors.some(author =>
            normalizeText(author.full_name).includes(normalizedSearchTerm)
        );

        // Nếu tìm thấy sách hoặc tìm thấy cả sách và tác giả, ưu tiên chuyển đến trang sách
        if (matchingBook) {
            navigate(`/book_list?search=${encodeURIComponent(searchTerm)}`);
        }
        // Nếu chỉ tìm thấy tác giả, chuyển đến trang tác giả
        else if (matchingAuthor) {
            navigate(`/author_list?search=${encodeURIComponent(searchTerm)}`);
        }
        // Nếu không tìm thấy gì, mặc định chuyển đến trang sách
        else {
            navigate(`/book_list?search=${encodeURIComponent(searchTerm)}`);
        }
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
                    <div className="flex w-[530px] h-[75px] bg-white rounded-lg shadow-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for your book or author"
                            className="flex-grow px-4 py-2 focus:outline-none text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button
                            className="w-[152px] bg-[#01A268] text-white font-semibold hover:bg-green-600 transition duration-300"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
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