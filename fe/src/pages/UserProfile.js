import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Edit2, Save, X } from 'lucide-react';
import moment from 'moment';
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
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };
    fetchOrders();
  }, [userId]);

  const handleShowOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9999/api/order/detail/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data);
      setShowOrderDetails(true);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
    if (confirmCancel) {
      try {
        await axios.put(`http://localhost:9999/api/order/cancel/${orderId}`);

        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: 'cancel' } : order
        ));
      } catch (error) {
        setErrorMessage('Không thể hủy đơn hàng. Vui lòng thử lại.');
        console.error(error);
      }
    }
  };

  const handleConfirmReceived = async (orderId) => {
    const confirmReceived = window.confirm('Bạn có chắc chắn đã nhận được hàng chưa?');
    if (confirmReceived) {
      try {
        await axios.put(`http://localhost:9999/api/order/success/${orderId}`);
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: 'success' } : order
        ));
      } catch (error) {
        setErrorMessage('Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại.');
        console.error(error);
      }
    }
  };

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'phone') {
      // Chỉ xử lý số điện thoại để bỏ dấu cách
      processedValue = String(value).replace(/\s/g, '');
    }
    // Không xử lý dấu cách cho fullName tại đây nữa
    
    setEditedUser(prev => ({ ...prev, [name]: processedValue }));
  };

  // Đặt hàm validateInputs lên trên cùng
  const validateInputs = () => {
    const { fullName, password, confirmPassword, phone } = editedUser;

    if (fullName.length < 7) {
      alert("Họ tên phải có ít nhất 7 ký tự.");
      return false;
    }

    // Xử lý và kiểm tra fullName
    const trimmedName = fullName.replace(/\s+/g, ' ').trim();
    if (trimmedName.length < 7) {
      alert("Họ tên phải có ít nhất 7 ký tự.");
      return false;
    }

    // Only validate password if user entered a new one
    if (password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(password)) {
        alert("Mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ cái (không có ký tự đặc biệt).");
        return false;
      }

      if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return false;
      }
    }

    const cleanPhone = String(phone).replace(/\s/g, '');
    if (cleanPhone.length !== 10) {
      alert("Số điện thoại phải đủ 10 chữ số.");
      return false;
    }

    return true;
  };

  // Hàm handleSave sẽ được sử dụng bên dưới hàm validateInputs
  const handleSave = async () => {
    if (!validateInputs()) return;

    // Process the phone number: remove spaces and add leading 0
    const processedPhone = String(editedUser.phone).replace(/\s/g, '');
    const phoneWithLeadingZero = processedPhone.startsWith('0') ? processedPhone : '0' + processedPhone;

    // Create the update payload
    const updatePayload = {
      full_name: editedUser.fullName.replace(/\s+/g, ' ').trim(),
      email: user.email,
      phone_number: phoneWithLeadingZero,
    };

    // Only include password in payload if a new one was entered
    if (editedUser.password) {
      updatePayload.password = editedUser.password;
    }

    try {
      const response = await fetch(`http://localhost:9999/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        alert("Cập nhật thông tin thành công!");
        window.location.reload();
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  const handleClosePopup = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };
  // Hàm handleLogout để xử lý sự kiện đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token'); // Xóa token nếu có
    window.location.href = '/'; // Chuyển hướng về trang chủ 
  };

  if (!user) return <div>Loading...</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return moment(date).format('HH:mm DD-MM-YYYY');
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
        <div className="flex items-center justify-between">
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
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleLogout} // Thêm sự kiện khi nhấn nút Đăng xuất
        >
          Đăng xuất
        </button>
      </div>
      <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Đơn hàng của tôi</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Mã đơn hàng</th>
              <th className="px-4 py-2">Ngày đặt</th>
              <th className="px-4 py-2">Tổng tiền</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 max-w-[100px] truncate">{order.order_id}</td>
                  <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-2">{order.total_price} VND</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    <div className='flex gap-4'>

                      {order.status !== 'cancel' && (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleShowOrderDetails(order._id)}
                        >
                          Xem chi tiết
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button
                          className="bg-red-500 text-white text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup chi tiết đơn hàng */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
            <div className="w-full flex flex-col md:flex-row gap-4">
              {/* Cột thông tin đơn hàng */}
              <div className="w-1/2 flex-grow">
                <h3 className="font-bold">Thông tin đơn hàng</h3>
                <div className="flex flex-col gap-2">
                  <p><strong>Mã đơn hàng:</strong> {selectedOrder.order_id}</p>
                  <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.createdAt)}</p>
                  <p><strong>Phí vận chuyển:</strong> {selectedOrder.shipping_price.toLocaleString()} VND</p>
                  <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                  <p><strong>Tên người nhận:</strong> {selectedOrder.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.email}</p>
                  <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                  <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
                  <p><strong>Ghi chú:</strong> {selectedOrder.note || 'Không có'}</p>
                </div>
              </div>

              {/* Cột sản phẩm */}
              <div className="w-1/2 flex-grow">
                <h3 className="font-bold">Sản phẩm</h3>
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
                      <p>{item.quantity} x {item.price/item.quantity.toLocaleString()} VND</p>
                    </div>
                    <span className="font-semibold">{(item.price).toLocaleString()} VND</span>

                  </div>

                ))}

              </div>

            </div>

            {/* Tổng tiền */}
            <div></div>
            <div className="mt-4 border-t flex-col pt-4">
              <p><strong>Tổng tiền sản phẩm:</strong> {selectedOrder.products_price.toLocaleString()} VND</p>
              <p><strong>Phí vận chuyển:</strong> {selectedOrder.shipping_price.toLocaleString()} VND</p>
              <p className="text-xl font-bold">
                <strong>Tổng cộng:</strong> {selectedOrder.total_price.toLocaleString()} VND
              </p>
            </div>
            <div>
              {selectedOrder.status !== 'success' && selectedOrder.status !== 'cancel' && (
                <button
                  className="mt-4 text-green-500 hover:text-green-700"
                  onClick={() => handleConfirmReceived(selectedOrder._id)}
                >
                  Đã nhận được hàng
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;