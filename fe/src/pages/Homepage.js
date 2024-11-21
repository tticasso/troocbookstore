import React from 'react';
import HomepageBanner from '../components/banner';
import BookCoverList from '../components/BookCoverList'; // Component mới tách ra cho danh sách sách
import AuthorList from '../components/AuthorList';       // Import danh sách tác giả
import ReviewList from '../components/ReviewList';       // Import danh sách review
import { UilArrowRight } from '@iconscout/react-unicons';

const Homepage = () => (
  <div className="w-full mx-auto">
    <HomepageBanner/>

    {/* Danh sách sách */}
    <h2 className="text-[50px] mb-4 text-center leading-[84px]">Latest books</h2>
    <div className='w-full flex justify-center items-center'>
    <BookCoverList />
    </div>
    

    {/* Danh sách tác giả */}
    <AuthorList />

    {/* Danh sách bài review */}
    <ReviewList />
  </div>
);

export default Homepage;
