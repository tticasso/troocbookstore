import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy authorId từ URL
import axios from 'axios';
import authorImagePlaceholder from '../assets/author.png'; // Hình ảnh mặc định nếu không có
import BookCoverList from '../components/BookCoverList';

const AuthorDetail = () => {
    const { authorId } = useParams(); // Lấy authorId từ URL
    const [authorData, setAuthorData] = useState(null); // Khởi tạo state để lưu thông tin tác giả
    const [loading, setLoading] = useState(true); // Thêm state để quản lý trạng thái loading
    const [error, setError] = useState(null); // Thêm state để quản lý lỗi

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/api/author/${authorId}`); // Gọi API lấy thông tin tác giả
                setAuthorData(response.data); // Lưu thông tin tác giả vào state
            } catch (error) {
                console.error('Error fetching author:', error);
                setError('Failed to fetch author data.'); // Xử lý lỗi
            } finally {
                setLoading(false); // Đặt loading thành false khi đã hoàn thành yêu cầu
            }
        };

        fetchAuthor();
    }, [authorId]); // Chỉ gọi lại nếu authorId thay đổi

    if (loading) {
        return <div>Loading...</div>; // Hiển thị thông báo loading
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị thông báo lỗi
    }

    // Kiểm tra nếu authorData không tồn tại
    if (!authorData) {
        return <div>No author found.</div>; // Hiển thị thông báo nếu không tìm thấy tác giả
    }

    const { img, full_name, introduce } = authorData; // Lấy các trường thông tin tác giả

    return (
        <div className="w-full bg-gray-100 min-h-screen py-12">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="w-1/4 p-6 flex flex-col items-center">
                        <img
                            src={img ? `http://localhost:9999/${img}` : authorImagePlaceholder} // Đường dẫn tới ảnh tác giả
                            alt={full_name}
                            className="w-48 h-48 rounded-full object-cover mb-4"
                        />
                    </div>
                    <div className="w-3/4 p-6 bg-gray-50">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">{full_name}</h2>
                        <p className="text-gray-700 text-base leading-relaxed">{introduce}</p> {/* Giới thiệu tác giả */}
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <div className='w-full grid justify-center items-center font-mono mt-10'>
                    <p className='mb-6 text-[#01A268] text-xl'>Maybe you like</p>
                    <BookCoverList />
                </div>
            </div>
        </div>
    );
};

export default AuthorDetail;
