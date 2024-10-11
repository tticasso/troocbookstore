import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import cartImg from "../assets/cart.png"

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Suoi am mat troi', price: 136000, quantity: 1, img: cartImg },
    { id: 2, name: 'Suoi am mat troi', price: 136000, quantity: 1, img: cartImg },
    { id: 3, name: 'Suoi am mat troi', price: 136000, quantity: 1, img: cartImg },
  ]);

  const [deliveryDate, setDeliveryDate] = useState('23/10/2024');
  const [deliveryTime, setDeliveryTime] = useState('14h00 - 18h00');

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl font-mono mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Your shopping Cart</h1>
      <div className="flex">
        <div className="flex-grow">
          {items.map(item => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <img src={item.img} alt={item.name} className="w-20 h-30 object-cover mr-4" />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-green-600">{item.price.toLocaleString()} ₫</span>
                  <div className="ml-4 flex items-center">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 border">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 border">+</button>
                  </div>
                </div>
              </div>
              <span className="text-green-600 ml-4">{(item.price * item.quantity).toLocaleString()} ₫</span>
              <button className="ml-4 text-red-500"><Trash2 size={20} /></button>
            </div>
          ))}
        </div>
        <div className="ml-8 bg-[#F3F1ED] w-64">
          <h2 className="font-semibold mb-2">Delivery time</h2>
          <div className="mb-4">
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <select
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>14h00 - 18h00</option>
              {/* Add more time options here */}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-2xl font-bold text-green-600">{total.toLocaleString()} ₫</span>
      </div>
      <button className="mt-4 mb-20 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
        Payment
      </button>
    </div>
  );
};

export default Cart;