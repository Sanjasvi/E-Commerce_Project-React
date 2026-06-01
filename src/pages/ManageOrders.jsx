import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function ManageOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await axios.get(

                    `${API_URL}/orders/all`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setOrders(
                response.data
            );
        };

    const updateStatus =
        async (
            id,
            status
        ) => {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.put(

                `${API_URL}/orders/status/${id}?status=${status}`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchOrders();
        };

    return (

        <div className="container mt-5">

            <h2>
                Manage Orders
            </h2>

            <table className=
                "table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>User</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
                    {
                        orders.map(
                            (order) => (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.userId}</td>

                                    <td>₹ {order.totalAmount}</td>

                                    <td>{order.status}</td>

                                    <td>
                                        <button

                                            className=
                                            "btn btn-warning me-2"

                                            onClick={() =>

                                                updateStatus(
                                                    order.id,
                                                    "SHIPPED"
                                                )

                                            }

                                        >Ship</button>

                                        <button className="btn btn-success"

                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "DELIVERED"
                                                )
                                            }
                                        >
                                            Deliver
                                        </button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ManageOrders;