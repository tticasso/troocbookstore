import React from 'react';
import author from '../assets/author.png';
import topReview from '../assets/topReview.png';
import { UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons';

const AuthorCard = ({ name, image }) => (
    <div className="w-[221px] h-[270px] flex flex-col items-center">
      <img src={author} alt={name} className="w-[190px] h-[198px] rounded-full object-cover" />
      <p className="text-[24px] leading-[31px] mt-1 font-mono">{name}</p>
    </div>
  );

const TopReviewCard = ({ title, author, date, image }) => (
  <div className="flex items-center space-x-4 mb-4">
    <img src={image || author} alt={title} className="w-[159px] h-[120px] object-cover rounded" />
    <div className='space-y-3'>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-gray-600">{author}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  </div>
);

const AuthorList = () => {
  const mainAuthors = [
    { name: "Nguyen Huy thiep", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
    { name: "Charlotte Bronte", image: author },
  ];

  const topReviews = [
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
    { title: "Review: Xu Cat", author: "Frank Herbert", date: "14/09/2024", image: topReview },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-4xl text-green-600 mb-8">Authors</h2>
      <div className="flex">
        <div className="w-3/4 pr-8">
          <div className="grid grid-cols-4 gap-6">
            {mainAuthors.map((author, index) => (
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