import React, { useEffect, useState } from 'react';
import { ChevronLeft, HandCoins } from 'lucide-react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [cartData, setCartData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingMethod, setShippingMethod] = useState('homeDelivery');
  const userId = localStorage.getItem("userId"); // Thay bằng user ID động nếu cần

  // Gọi API để lấy dữ liệu giỏ hàng
  useEffect(() => {

    fetch(`http://localhost:9999/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCartData(data))
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        user_id: userId,
        ...formData,
        items: cartData.items,
        total_price: cartData.total_price,
        payment_method: paymentMethod,
        shipping_method: shippingMethod
      };
  
      const response = await fetch('http://localhost:9999/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('Đặt hàng thất bại!');
      }
  
      const result = await response.json();
      alert(`Đặt hàng thành công! Ngày đặt hàng: ${new Date(result.orderDate).toLocaleString('vi-VN')}`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Đặt hàng thất bại, vui lòng thử lại.');
    }
  };
  

  if (!cartData) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const { items, total_price } = cartData;

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 font-mono flex">
      <div className="w-2/3 pr-8">
        {/* Form thông tin nhận hàng */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <div className="flex col-span-2">
                <select className="w-16 p-2 border rounded-l">
                  <option>🇻🇳</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-grow p-2 border rounded-r"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleInputChange}
                className="p-2 border rounded col-span-2"
              />
              <textarea
                name="note"
                placeholder="Ghi chú (tùy chọn)"
                value={formData.note}
                onChange={handleInputChange}
                className="p-2 border rounded col-span-2"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Phần vận chuyển và thanh toán */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vận chuyển</h2>
          <div className="p-4 bg-white border rounded flex items-center">
            <input
              type="radio"
              id="homeDelivery"
              name="shippingMethod"
              value="homeDelivery"
              checked={shippingMethod === 'homeDelivery'}
              onChange={() => setShippingMethod('homeDelivery')}
              className="mr-2"
            />
            <label htmlFor="homeDelivery" className="flex-grow">Giao hàng tận nơi</label>
            <span className="font-semibold">25.000₫</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>
          <div className="flex items-center p-4 border rounded">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={() => setPaymentMethod('COD')}
              className="mr-2"
            />
            <div className="flex w-full justify-between">
              <label htmlFor="cod">Thanh toán khi giao hàng (COD)</label>
              <HandCoins />
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3 bg-gray-50 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng ({items.length} sản phẩm)</h2>
        <div className="space-y-4 mb-4">
          {items.map((item) => (
            <div key={item._id} className="flex items-start">
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
                <h3 className="w-[150px] font-semibold">{item.book_id.title}</h3>
              </div>
              <span className="font-semibold ml-6">{item.price.toLocaleString()}₫</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Phí vận chuyển</span>
            <span>25.000₫</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng cộng</span>
            <span>{(subtotal + 25000).toLocaleString()}₫</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <a href="cart" className="text-blue-500 flex items-center">
            <ChevronLeft size={16} />
            <span>Quay về giỏ hàng</span>
          </a>
          <button
            className="bg-[#357EBD] text-white px-6 py-2 rounded"
            onClick={handlePlaceOrder}
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
