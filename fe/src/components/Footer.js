import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
    console.log('Đăng ký với email:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#F3F1ED] py-6">
      <div className="w-4/6 font-mono container mx-auto px-4 flex justify-between items-center py-10">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-green-600 mb-2">TroocBookstore</h2>
          <div className="flex items-center mb-4">
            <MapPin size={16} className="text-green-600 mr-2" />
            <span className="text-[16px] text-[#01A268]">77-79 Muc Uyen - Tan Xa - Thach That - Ha Noi</span>
          </div>
          <div className="flex items-center mb-4">
            <Mail size={16} className="text-green-600 mr-2" />
            <span className="text-[16px] text-[#01A268]">troocbookstore@gmail.com</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-green-600 mr-2" />
            <span className="text-[16px] text-[#01A268]">0836740238</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[20px] text-[#01A268] leading-[51px] mb-2">Receive promotional information from us</span>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abcxyz@gmail.com"
              className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="bg-[#01A268] text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;