import React from 'react';
import author from '../assets/author.png';
import { UilArrowRight } from '@iconscout/react-unicons';

const AuthorAvatar = ({ name, image }) => (
  <div className="w-[221px] h-[270px] flex flex-col items-center">
    <img src={author} alt={name} className="w-[221px] h-[221px] rounded-full object-cover" />
    <p className="text-[24px] leading-[31px] mt-1 font-mono">{name}</p>
  </div>
);

const AuthorList = () => (
  <div className="mb-8">
    <h2 className="text-[50px] mb-4 text-center leading-[84px]">Authors</h2>
    <div className="flex space-x-6 justify-center overflow-x-auto">
      <AuthorAvatar name="Author 1" image="/api/placeholder/100/100" />
      <AuthorAvatar name="Author 2" image="/api/placeholder/100/100" />
      <AuthorAvatar name="Author 3" image="/api/placeholder/100/100" />
      <AuthorAvatar name="Author 4" image="/api/placeholder/100/100" />
      <AuthorAvatar name="Author 5" image="/api/placeholder/100/100" />
    </div>
    <div className='flex justify-end mx-auto mr-44 mt-2 text-[#01A268] pointer'>
      <a href='#'>View all</a>
      <UilArrowRight/>
    </div>
  </div>
);

export default AuthorList;
