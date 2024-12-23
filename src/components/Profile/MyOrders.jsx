import React from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const orders = [
    { id: '12345', date: '2024-12-01', status: 'Delivered' },
    { id: '67890', date: '2024-11-25', status: 'Shipped' },
    { id: '11223', date: '2024-11-18', status: 'Pending' },
  ];

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
