import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const normalizeText = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .trim();
};

const BookCover = ({ src, alt, style }) => (
    <img src={src} alt={alt} className="absolute rounded-lg shadow-lg" style={style} />
);

const Banner = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [randomBooks, setRandomBooks] = useState([]); // Thêm khai báo randomBooks
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

                // Chọn ngẫu nhiên 3 sách từ danh sách books
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

        // Kiểm tra xem từ khóa có khớp với tên tác giả nào không
        const matchingAuthor = authors.find(author =>
            normalizeText(author.full_name).includes(normalizedSearchTerm)
        );

        if (matchingAuthor) {
            navigate(`/author_list?search=${normalizedSearchTerm}`);
        } else {
            navigate(`/book_list?search=${normalizedSearchTerm}`);
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
