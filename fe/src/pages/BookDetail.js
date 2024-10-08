import React, { useState } from 'react';
import { Book, Minus, Plus, ShoppingCart } from 'lucide-react';
import BookDetail1 from '../assets/BookDetail1.png'
import BookCoverList from '../components/BookCoverList';

const BookDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 ml-20">
          <img
            src={BookDetail1}
            alt="Suoi Am Mat Troi book cover"
            className="w-[298px] h-[480px] h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 mr-20">
          <h1 className="text-3xl font-bold mb-2 font-mono">Suoi Am Mat Troi</h1>
          <p className="text-gray-600 mb-4 font-mono">Author: Jose Mauro De Vasconcelos</p>
          <p className="text-2xl font-bold text-green-600 font-mono">136.000 đ</p>

          <hr className="my-8 border-t border-black" />

          <div className="flex items-center gap-4 mb-4">
            <button onClick={decrementQuantity} className="px-2 py-1 border rounded">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xl font-mono">{quantity}</span>
            <button onClick={incrementQuantity} className="px-2 py-1 border rounded">
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-gray-400">86 left in stock</span>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 px-4 py-2 border rounded-[5px] flex items-center justify-center">
              <ShoppingCart className="mr-2 h-4 w-4 font-mono" /> Add to cart
            </button>
            <button className="flex-1 px-4 py-2 bg-[#01A268] text-white rounded font-mono">Buy Now</button>
          </div>
        </div>
      </div>

      <hr className="my-8 border-t border-[#01A268]" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl text-[#01A268] font-bold font-mono">About the book</h2>
          <h2 className="text-xl font-bold mb-4 font-mono">Lorem ipsum</h2>
          <p className="text-sm text-gray-600 mb-4 font-mono">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p className="text-sm text-gray-600 mb-4 font-mono">
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
          <p className="text-sm text-gray-600 font-mono">
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 font-mono">Detail</h2>
          <ul className="space-y-2">
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Author</span>
              <span>Jose Mauro De Vasconcelos</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Translater</span>
              <span>Dang Bao Kim</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Publisher</span>
              <span>NXB Kim Dong</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Size</span>
              <span>14 x 20.5 cm</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Pages</span>
              <span>376 pages</span>
            </li>
            <li className="flex justify-between font-mono">
              <span className="text-gray-600">Release date</span>
              <span>2024</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-t border-[#01A268]" />

      <div className='font-mono'>
        <p className='mb-6 text-[#01A268] text-xl'>Maybe you like</p>
      <BookCoverList/>
      </div>
        
    </div>
  );
};

export default BookDetails;