import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        confirmPassword: '',
      });
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9999/api/order/${userId}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId]);

  // Hàm hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
    if (confirmCancel) {
      try {
        const response = await fetch(`http://localhost:9999/api/order/cancel/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Không thể hủy đơn hàng');
        }

        // Cập nhật trạng thái đơn hàng sau khi hủy thành công
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'cancel' } : order
          )
        );
        alert('Đơn hàng đã được hủy thành công.');
      } catch (error) {
        setErrorMessage('Không thể hủy đơn hàng. Vui lòng thử lại.');
        console.error(error);
      }
    }
  };

  // Hiển thị chi tiết đơn hàng
  const handleShowOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9999/api/order/detail/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data);
      setShowOrderDetails(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Đóng chi tiết đơn hàng
  const handleClosePopup = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // Chỉnh sửa thông tin người dùng
  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
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
      alert("Cập nhật thông tin thành công!");
      window.location.reload();
    } else {
      alert("Cập nhật thất bại!");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-5/6 flex flex-row container mx-auto p-4 gap-4">
      <div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
          {editing ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleChange}
            />
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">{user?.full_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <p className="py-2 px-3 bg-gray-100 rounded">{user?.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
          {editing ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
            />
          ) : (
            <p className="py-2 px-3 bg-gray-100 rounded">{user?.phone_number}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {editing ? (
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
              <Save size={20} className="inline mr-2" /> Lưu
            </button>
          ) : (
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>
              <Edit2 size={20} className="inline mr-2" /> Chỉnh sửa
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
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2">{order.orderCode}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-2">{order.total_price.toLocaleString()} VND</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowOrderDetails(order._id)}
                        className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
                      >
                        Xem chi tiết
                      </button>
                      {(order.status === 'pending' || order.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                        >
                          Hủy Đơn Hàng
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Không có đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
            <p><strong>Mã đơn hàng:</strong> {selectedOrder.orderCode}</p>
            <p><strong>Ngày đặt hàng:</strong> {formatDate(selectedOrder.createdAt)}</p>
            <p><strong>Tổng tiền:</strong> {selectedOrder.total_price.toLocaleString()} VND</p>
            <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            <p><strong>Ghi chú:</strong> {selectedOrder.note || 'Không có'}</p>
            <h3 className="mt-4 font-bold">Sản phẩm</h3>
            {selectedOrder.items.map((item) => (
              <div key={item._id} className="flex items-start border-b py-2">
                <div className="relative">
                  <img
                    src={`http://localhost:9999/${item.book_id.img}`}
                    alt={item.book_id.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.quantity}
                  </span>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.book_id.title}</h3>
                  <p>{item.quantity} x {item.price.toLocaleString()} VND</p>
                </div>
                <span className="font-semibold">{(item.quantity * item.price).toLocaleString()} VND</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
