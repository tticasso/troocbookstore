import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import BookCoverList from '../components/BookCoverList';

const BookDetails = () => {
  const { bookId } = useParams(); // Lấy bookId từ URL
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [authorName, setAuthorName] = useState('');
  const user_id = localStorage.getItem('userId');
  const incrementQuantity = () => {
    if (quantity < book.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/author/list');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchBookDetails();
    fetchAuthors();
  }, [bookId]);

  useEffect(() => {
    if (book && authors.length > 0) {
      const author = authors.find((author) => author._id === book.author);
      if (author) {
        setAuthorName(author.full_name);
      }
    }
  }, [book, authors]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    const body = {
      user_id: user_id,
      book_id: book._id,
      quantity: quantity,
    };

    try {
      const response = await axios.post('http://localhost:9999/api/cart/add', body);
      console.log('Add to cart success:', response.data);
      alert('Book added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart.');
    }
  };


  return (
    <div className="w-5/6 mx-auto p-4 flex flex-col justify-center items-center">
      <div className="w-4/5 flex flex-col md:flex-row gap-8">
        <div className="ml-20">
          <img
            src={`http://localhost:9999/uploads/${book.img.split('\\').pop()}`}
            alt={book.title}
            className="w-[298px] h-[480px] h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 mr-20">
          <h1 className="text-3xl font-bold mb-2 font-mono">Tên sách: {book.title}</h1>
          <p className="text-gray-600 mb-4 font-mono">Author: {authorName || 'N/A'}</p>
          <p className="text-2xl font-bold text-green-600 font-mono">{book.price} ₫</p>

          <hr className="my-8 border-t border-black" />

          <div className="flex items-center gap-4 mb-4">
            <button onClick={decrementQuantity} className="px-2 py-1 border rounded">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xl font-mono">{quantity}</span>
            <button onClick={incrementQuantity} className="px-2 py-1 border rounded">
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-gray-400">{book.quantity} left in stock</span>
          </div>
          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 px-4 py-2 border rounded-[5px] flex items-center justify-center">
              <ShoppingCart className="mr-2 h-4 w-4 font-mono" /> Add to cart
            </button>
          </div>
        </div>
      </div>

      <hr className="my-8 border-t border-[#01A268]" />

      <div className="w-full flex gap-6">
        <div className="w-3/5 border rounded-lg p-4">
          <h2 className="text-xl text-[#01A268] font-bold font-mono">About the book</h2>
          <h2 className="text-xl font-bold mb-4 font-mono">{book.title}</h2>
          <p className="text-sm text-gray-600 mb-4 font-mono">{book.description}</p>
        </div>

        <div className="w-2/5 border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 font-mono">Detail</h2>
          <ul className="space-y-2">
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Author</span>
              <span>{authorName || 'N/A'}</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Publisher</span>
              <span>{book.publisher || 'N/A'}</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Size</span>
              <span>14 x 20.5 cm</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Pages</span>
              <span>{book.pages || 'N/A'}</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Release Year</span>
              <span>{new Date(book.publication_date).getFullYear()}</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-t border-[#01A268]" />

      <div className="font-mono">
        <p className="mb-6 text-[#01A268] text-xl">Maybe you like</p>
        <BookCoverList />
      </div>
    </div>
  );
};

export default BookDetails;
