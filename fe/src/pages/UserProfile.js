import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit2, Save } from 'lucide-react';

const UserProfile = () => {
  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '', // Thêm trường xác nhận mật khẩu
  });

  const [orders, setOrders] = useState([
    { id: '001', date: '2023-10-15', total: 250000, status: 'Đã giao' },
    { id: '002', date: '2023-11-20', total: 180000, status: 'Đang giao' },
    { id: '003', date: '2023-12-05', total: 320000, status: 'Chờ xử lý' },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:9999/api/user/${userId}`);
      const data = await response.json();
      setUser(data);
      setEditedUser({
        fullName: data.full_name,
        email: data.email,
        password: '',
        phone: data.phone_number,
        confirmPassword: '', // Khởi tạo trường xác nhận mật khẩu
      });
    };
    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
  };

  const validateInputs = () => {
    const { fullName, password, confirmPassword, phone } = editedUser;

    if (fullName.length < 7) {
      alert("Họ tên phải có ít nhất 7 ký tự.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Ít nhất 6 ký tự và ít nhất 1 chữ cái
    if (!passwordRegex.test(password)) {
      alert("Mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ cái (không có ký tự đặc biệt).");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return false;
    }

    if (phone.length !== 10) {
      alert("Số điện thoại phải đủ 10 chữ số.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return; // Kiểm tra đầu vào

    // Gửi thông tin đã chỉnh sửa tới API
    const response = await fetch(`http://localhost:9999/api/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: editedUser.fullName,
        email: user.email, // Không cho phép chỉnh sửa email
        password: editedUser.password,
        phone_number: editedUser.phone,
      }),
    });

    if (response.ok) {
      alert("Cập nhật thông tin thành công!"); // Thông báo thành công
      window.location.reload(); // Tải lại trang để cập nhật thông tin mới
    } else {
      alert("Cập nhật thất bại!"); // Thông báo lỗi
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  if (!user) return <div>Loading...</div>; // Đợi cho dữ liệu người dùng được lấy về

  return (
    <div className="w-5/6 flex flex-row container mx-auto p-4 gap-4">
      <div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Họ và tên
          </label>
          {editing ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleChange}
            />
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">{user.full_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <p className="py-2 px-3 bg-gray-100 rounded">{user.email}</p> {/* Không cho phép chỉnh sửa email */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mật khẩu
          </label>
          {editing ? (
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu mới"
                value={editedUser.password}
                onChange={handleChange}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={editedUser.confirmPassword}
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">••••••••</p>
          )}
          {editing && (
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Số điện thoại
          </label>
          {editing ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
            />
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">(+84) {user.phone_number}</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          {editing ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              <Save size={20} className="inline mr-2" />
              Lưu
            </button>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEdit}
            >
              <Edit2 size={20} className="inline mr-2" />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      <div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Đơn hàng của tôi</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Mã đơn hàng</th>
              <th className="px-4 py-2">Ngày đặt</th>
              <th className="px-4 py-2">Tổng tiền</th>
              <th className="px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.total} VND</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
