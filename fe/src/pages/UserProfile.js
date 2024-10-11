import React, { useState } from 'react';
import { Eye, EyeOff, Edit2, Save } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    password: 'password123',
    phone: '0123456789',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const [orders, setOrders] = useState([
    { id: '001', date: '2023-10-15', total: 250000, status: 'Đã giao' },
    { id: '002', date: '2023-11-20', total: 180000, status: 'Đang giao' },
    { id: '003', date: '2023-12-05', total: 320000, status: 'Chờ xử lý' },
  ]);

  const handleEdit = () => {
    setEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    setUser(editedUser);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

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
            <p className="py-2 px-3 bg-gray-100 rounded">{user.fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          {editing ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">{user.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mật khẩu
          </label>
          <div className="relative">
            {editing ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={editedUser.password}
                onChange={handleChange}
              />
            ) : (
              <p className="py-2 px-3 bg-gray-100 rounded">
                {showPassword ? user.password : '••••••••'}
              </p>
            )}
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
            <p className="py-2 px-3 bg-gray-100 rounded">{user.phone}</p>
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
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.total.toLocaleString()} VND</td>
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