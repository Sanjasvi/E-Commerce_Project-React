import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const response = await axios.get(
            `http://localhost:8080/orders/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setOrders(response.data);
    };

    return (

        <div className="container mt-5">

            <h2>My Orders</h2>

            <table className="table table-bordered mt-4">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>₹ {order.totalAmount}</td>

                            <td>{order.status}</td>

                            <td>{order.orderDate}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;