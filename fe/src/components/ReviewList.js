import React from 'react';
import review from '../assets/review.png';
import { UilArrowRight } from '@iconscout/react-unicons';

const ReviewCard = ({ title, date, image }) => (
  <div className="w-[338px] h-[353px] bg-white rounded-md shadow-md overflow-hidden">
    <img src={review} alt={title} className="w-full h-[240px] object-cover" />
    <div className="p-2">
      <p className="text-[24px] leading-[32px] font-mono">{title}</p>
      <p className="text-[24px] text-[#0000004D] font-mono">{date}</p>
    </div>
  </div>
);

const ReviewList = () => (
  <div className='mb-20'>
    <h2 className="text-[50px] mb-4 text-center leading-[84px]">Book Review</h2>
    <div className="flex space-x-20 overflow-x-auto justify-center">
      <ReviewCard title="Review 1" date="01 Jan 2023" image="/api/placeholder/200/150" />
      <ReviewCard title="Review 2" date="15 Feb 2023" image="/api/placeholder/200/150" />
      <ReviewCard title="Review 3" date="30 Mar 2023" image="/api/placeholder/200/150" />
    </div>
    <div className='flex justify-end mx-auto mr-44 mt-2 text-[#01A268] pointer'>
      <a href='#'>View all</a>
      <UilArrowRight/>
    </div>
  </div>
);

export default ReviewList;
