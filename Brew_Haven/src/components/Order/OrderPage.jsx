// src/components/OrderPage.jsx
import React, { useState } from 'react';
import { createOrder } from '../../api/index';

const OrderPage = () => {
  const [orderData, setOrderData] = useState({
    user: '',
    items: [],
    total: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(orderData);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2>Order Food</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <input
            type="text"
            value={orderData.user}
            onChange={(e) => setOrderData({ ...orderData, user: e.target.value })}
          />
        </label>
        {/* Add form fields for items and total */}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderPage;