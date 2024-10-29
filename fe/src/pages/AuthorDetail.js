import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import authorImagePlaceholder from '../assets/author.png';

const AuthorDetail = () => {
    const { authorId } = useParams();
    const [authorData, setAuthorData] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/api/author/${authorId}`);
                setAuthorData(response.data);
            } catch (error) {
                console.error('Error fetching author:', error);
                setError('Failed to fetch author data.');
            } finally {
                setLoading(false);
            }
        };

        const fetchBooksByAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/api/author/${authorId}/books`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books for author:', error);
                setError('Failed to fetch books for author.');
            }
        };

        fetchAuthor();
        fetchBooksByAuthor();
    }, [authorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!authorData) {
        return <div>No author found.</div>;
    }

    const { img, full_name, introduce } = authorData;

    return (
        <div className="w-full bg-gray-100 min-h-screen py-12">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="w-1/4 p-6 flex flex-col items-center">
                        <img
                            src={img ? `http://localhost:9999/${img}` : authorImagePlaceholder}
                            alt={full_name}
                            className="w-48 h-48 rounded-full object-cover mb-4"
                        />
                    </div>
                    <div className="w-3/4 p-6 bg-gray-50">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">{full_name}</h2>
                        <p className="text-gray-700 text-base leading-relaxed">{introduce}</p>
                    </div>
                </div>
            </div>

            {/* Hiển thị danh sách sách của tác giả */}
            <div className='w-full flex justify-center items-center mt-10'>
                <div className='w-full max-w-6xl'>
                    <h3 className='text-2xl font-semibold text-green-600 mb-4 text-center'>Books by {full_name}</h3>
                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map(book => (
                            <div key={book._id} className="bg-white p-4 shadow rounded-lg text-center">
                                <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
                                    <img
                                        src={`http://localhost:9999/${book.img}`}
                                        alt={book.title}
                                        className="w-full h-full object-contain" // Thay đổi từ object-cover sang object-contain
                                    />
                                </div>
                                <h4 className="text-lg font-semibold">{book.title}</h4>
                                <p className="text-gray-500 text-sm mb-2">{book.description}</p>
                                
                            </div>
                        ))}
                    </div>
                    
                    ) : (
                        <p className="text-center text-gray-500">No books found for this author.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthorDetail;
