import React from 'react';
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'
import banner3 from '../assets/banner3.png'

const BookCover = ({ src, alt, style }) => (
    <img src={src} alt={alt} className="absolute rounded-lg shadow-lg" style={style} />
);

const Banner = () => (
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
                            className="w-[300px] flex-grow px-4 py-2 focus:outline-none "
                        />
                    </div>
                    <div className='w-[152px] h-[45px] pt-4 pb-4 pl-4 ml-20'>
                        <button className="w-[152px] h-[45px] bg-[#01A268] text-white px-6 py-2 hover:bg-green-600 transition duration-300">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 relative h-80 mb-10">
                <BookCover
                    src={banner1}
                    alt="Book 1"
                    style={{ right: '250px', top: '0px', width: '240px', height: '360px', zIndex: 3 }}
                />
                <BookCover
                    src={banner2}
                    alt="Book 2"
                    style={{ right: '150px', top: '20px', width: '240px', height: '320px', zIndex: 2 }}
                />
                <BookCover
                    src={banner3}
                    alt="Book 3"
                    style={{ right: '100px', top: '40px', width: '240px', height: '260px', zIndex: 1 }}
                />
            </div>
        </div>
    </div>
);

export default Banner;