import React, { useState, useEffect } from 'react';
import { ChevronLeft, HandCoins } from 'lucide-react';
import cartImg from "../assets/cart.png"

const locationData = {
  "Hà Nội": {
    "Cầu Giấy": ["Dịch Vọng", "Nghĩa Đô", "Nghĩa Tân"],
    "Ba Đình": ["Cống Vị", "Điện Biên", "Đội Cấn"]
  },
  "Hồ Chí Minh": {
    "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho"],
    "Quận 2": ["Thảo Điền", "An Phú", "Bình An"]
  },
  "Đà Nẵng": {
    "Hải Châu": ["Hải Châu I", "Hải Châu II", "Thạch Thang"],
    "Thanh Khê": ["An Khê", "Chính Gián", "Tam Thuận"]
  }
};

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [discountCode, setDiscountCode] = useState('');
  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  useEffect(() => {
    if (formData.city) {
      setDistricts(Object.keys(locationData[formData.city] || {}));
      setFormData(prev => ({ ...prev, district: '', ward: '' }));
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.city && formData.district) {
      setWards(locationData[formData.city][formData.district] || []);
      setFormData(prev => ({ ...prev, ward: '' }));
    }
  }, [formData.city, formData.district]);

  const locationData = {
  "Hà Nội": {
    "Cầu Giấy": ["Dịch Vọng", "Nghĩa Đô", "Nghĩa Tân"],
    "Ba Đình": ["Cống Vị", "Điện Biên", "Đội Cấn"]
  },
  "Hồ Chí Minh": {
    "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho"],
    "Quận 2": ["Thảo Điền", "An Phú", "Bình An"]
  },
  "Đà Nẵng": {
    "Hải Châu": ["Hải Châu I", "Hải Châu II", "Thạch Thang"],
    "Thanh Khê": ["An Khê", "Chính Gián", "Tam Thuận"]
  }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const orderItems = [
    { id: 1, name: 'SUỐI ẤM MẶT TRỜI', price: 136000, discount: 24000, img: cartImg },
    { id: 2, name: 'BIẾT THƯ BUỒN', price: 100300, discount: 17700, img: cartImg },
    { id: 3, name: 'ANH MÈO VÀNG VÀ CÔ CHIM ÉN', price: 74800, discount: 13200, img: cartImg }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 font-mono flex">
      <div className="w-2/3 pr-8">
        <div className="flex items-center mb-6">
          <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">Logo - TroocBookStore</h1>
        </div>
        
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
              <div className="flex">
                <select className="w-16 p-2 border rounded-l">
                  <option>🇻🇳</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại (tùy chọn)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-grow p-2 border rounded-r"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ (tùy chọn)"
                value={formData.address}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Tỉnh thành</option>
                {Object.keys(locationData).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="p-2 border rounded"
                disabled={!formData.city}
              >
                <option value="">Quận huyện</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              
              <select
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                className="p-2 border rounded"
                disabled={!formData.district}
              >
                <option value="">Phường xã</option>
                {wards.map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
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

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vận chuyển</h2>
          <div className="p-4 bg-blue-50 rounded">
            Vui lòng nhập thông tin giao hàng
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
            <div className='flex w-full justify-between'>
            <label htmlFor="cod">Thanh toán khi giao hàng (COD)</label>
            <HandCoins/>
            </div>
            
          </div>
        </div>
      </div>

      <div className="w-1/3 bg-gray-50 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng (3 sản phẩm)</h2>
        <div className="space-y-4 mb-4">
          {orderItems.map(item => (
            <div key={item.id} className="flex items-start">
              <div className="relative">
                <img src={cartImg} alt={item.name} className="w-16 h-20 object-cover rounded" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Giảm 15% so với giá bìa (-{item.discount.toLocaleString()}₫)</p>
              </div>
              <span className="font-semibold ml-6">{item.price.toLocaleString()}₫</span>
            </div>
          ))}
        </div>
        <div className="flex items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={handleDiscountCodeChange}
            className="flex-grow p-2 rounded-l"
          />
          <button 
            className={`px-4 py-2 rounded text-white ${
              discountCode.trim() ? 'bg-[#357EBD]' : 'bg-[#84B0D5]'
            }`}
          >
            Áp dụng
          </button>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Phí vận chuyển</span>
            <span>-</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng cộng</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <a href="cart" className="text-blue-500 flex items-center">
            <ChevronLeft size={16} />
            <span>Quay về giỏ hàng</span>
          </a>
          <button className="bg-[#357EBD] text-white px-6 py-2 rounded">ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;