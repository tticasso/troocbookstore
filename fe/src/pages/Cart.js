import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import cartImg from "../assets/cart.png"; // fallback image

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('23/10/2024');
  const [deliveryTime, setDeliveryTime] = useState('14h00 - 18h00');

  const userId = localStorage.getItem('userId'); // Replace with dynamic userId if needed

  // Fetch cart data from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:9999/api/cart/${userId}`);
        const data = await response.json();
        console.log(data);
        
        setItems(data.items);
        setTotal(data.total_price);
        console.log(data.total_price);
        
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, [userId]);

  // Update quantity with API
  const updateQuantity = async (bookId, delta) => {
    try {
      const updatedItem = items.find(item => item.book_id._id === bookId);
      if (!updatedItem) return;

      const newQuantity = Math.max(1, updatedItem.quantity + delta);

      const response = await fetch('http://localhost:9999/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          book_id: bookId,
          quantity: delta,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedItems = items.map(item =>
        item.book_id._id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setItems(updatedItems);
      setTotal(updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
      window.location.reload();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart with API
  const removeItem = async (itemId) => {
    try {
      const response = await fetch('http://localhost:9999/api/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          item_id: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      // Filter out the removed item from the state
      const updatedItems = items.filter(item => item._id !== itemId);
      setItems(updatedItems);
      setTotal(updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="max-w-3xl font-mono mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Your shopping Cart</h1>
      <div className="flex">
        <div className="flex-grow">
          {items.map(item => (
            <div key={item._id} className="flex items-center mb-4 border-b pb-4">
              <img
                src={`http://localhost:9999/${item.book_id.img}`}
                alt={item.book_id.title}
                className="w-20 h-30 object-cover mr-4"
                onError={(e) => (e.target.src = cartImg)}
              />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.book_id.title}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-green-600">{item.price.toLocaleString()} ₫</span>
                  <div className="ml-4 flex items-center">
                    <button
                      onClick={() => updateQuantity(item.book_id._id, -1)}
                      className="px-2 py-1 border"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.book_id._id, 1)}
                      className="px-2 py-1 border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-green-600 ml-4">
                {(item.price).toLocaleString()} ₫
              </span>
              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-2xl font-bold text-green-600">{total.toLocaleString()} ₫</span>
      </div>
      <a href='/checkout'>
        <button className="mt-4 mb-20 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
          Payment
        </button>
      </a>
    </div>
  );
};

export default Cart;
