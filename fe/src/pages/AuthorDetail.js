import React from 'react';
import author from '../assets/author.png';
import BookCoverList from '../components/BookCoverList';
const TwoColumnAuthorProfile = ({ authorImage, authorName, biography }) => {
    return (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="w-1/4 p-6 flex flex-col items-center">
                    <img
                        src={authorImage}
                        alt={authorName}
                        className="w-48 h-48 rounded-full object-cover mb-4"
                    />
                </div>
                <div className="w-3/4 p-6 bg-gray-50">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">{authorName}</h2>
                    <p className="text-gray-700 text-base leading-relaxed">{biography}</p>
                </div>
            </div>
        </div>
    );
};

const AuthorDetail = () => {
    const authorData = {
        authorImage: author, // Thay thế bằng đường dẫn thực tế đến ảnh tác giả
        authorName: "Nguyễn Huy Thiệp",
        biography: `Nguyễn Huy Thiệp sinh năm 1950 ở Thái Nguyên, quê gốc ở Hà Nội. Thuở nhỏ, ông cùng gia đình di tản qua nhiều vùng quê ở Phú Thọ, Vĩnh Phúc. Ông tốt nghiệp khoa Lịch sử, Đại học Sư phạm Hà Nội. Ông xuất hiện trên văn đàn Việt Nam từ năm 1986, với một số truyện ngắn đăng trên Báo Văn nghệ để lại tiếng vang. Ngoài truyện ngắn, ông viết cả ký, sách, kịch bản, tiểu thuyết cùng nhiều tiểu luận, phê bình văn học của chủ ý, được xem là "hiện tượng hiếm" của văn đàn trong nước.

    Ông từng nhận huân chương Văn học Nghệ thuật Pháp (2007), giải thưởng Premio Nonino (Italy 2008). Một số tác phẩm nổi bật của ông gồm truyện ngắn Tướng về hưu, chuyển thể thành phim điện ảnh cùng tên năm 1988; Những người ngọc giả Tây Tạt (tập truyện ngắn và ký, 1989), Tiểu Long Nữ (tiểu thuyết, 1990), Tuổi 20 yêu dấu (tiểu thuyết, xuất bản ở Pháp năm 2002).`
    };

    return (
        <div className="w-full bg-gray-100 min-h-screen py-12">
            <TwoColumnAuthorProfile {...authorData} />

            <div className='w-full flex justify-center'>
            <div className='w-3/4 font-mono mt-10'>
                <p className='mb-6 text-[#01A268] text-xl'>Maybe you like</p>
                <BookCoverList />
            </div>
            </div>
            
        </div>
    );
};

export default AuthorDetail;