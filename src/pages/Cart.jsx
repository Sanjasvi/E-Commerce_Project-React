import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const response = await axios.get(
            `http://localhost:8080/cart/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setCartItems(response.data);
    };

    const placeOrder = async () => {

        let total = grandTotal;



        const token =
            localStorage.getItem(
                "token"
            );

        const userId =
            localStorage.getItem(
                "userId"
            );

        const orderData = {
            userId: userId,
            totalAmount: total
        };

        await axios.post(
            'http://localhost:8080/orders/place',
            orderData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        await axios.delete(
            `http://localhost:8080/cart/clear/${userId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        setCartItems([]);

        window.dispatchEvent(
            new Event(
                "cartUpdated"
            )
        );

        alert(
            "Order Placed"
        );

        navigate(
            "/order-success"
        );
    };


    const removeCartItem = async (id) => {

        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:8080/cart/remove/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        alert("Item Removed");

        fetchCart();

        window.dispatchEvent(
            new Event(
                "cartUpdated"
            )
        );
    };

    const grandTotal = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    const updateQuantity = async (
        id,
        quantity
    ) => {

        const token =
            localStorage.getItem(
                "token"
            );

        await axios.put(

            `http://localhost:8080/cart/update/${id}/${quantity}`,

            {},

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        fetchCart();

        window.dispatchEvent(
            new Event(
                "cartUpdated"
            )
        );
    };

    const handlePayment = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await axios.post(

                    "http://localhost:8080/payment/create-order",

                    null,

                    {
                        params: {
                            amount:
                                grandTotal
                        },

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }

                    }

                );

            const data =
                response.data;

            console.log(
                "Razorpay Order:",
                data
            );

            const options = {

                key:
                    "rzp_test_SstyWfFFxWoCwB",

                amount:
                    data.amount,

                currency:
                    "INR",

                name:
                    "ECommerce Store",

                description:
                    "Demo Payment",

                order_id:
                    data.id,

                prefill: {

                    name:
                        "Customer",

                    email:
                        "test@test.com"

                },

                handler:
                    async function (response) {

                        console.log(
                            response
                        );

                        await placeOrder();

                    },

                modal: {

                    ondismiss:
                        async function () {

                            await placeOrder();

                        }

                },

                theme: {
                    color:
                        "#3399cc"
                }

            };

            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.on(

                "payment.failed",

                function (response) {

                    console.log(
                        "FAILED:",
                        response
                    );

                    alert(
                        "Demo Payment Failed"
                    );

                    placeOrder();

                }

            );

            razorpay.open();

        }

        catch (error) {

            console.log(
                error
            );

            alert(
                "Payment Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <h2>Your Cart</h2>

            <h5>Total Items: {cartItems.length}</h5>

            <table className="table table-bordered mt-4">

                <thead>
                    <tr>
                        <th>Cart ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {cartItems.length === 0 ? (
<tr>
                            <td colSpan="6" className="text-center">
                                Cart Is Empty
                            </td>
                        </tr>
                    ) : (
                        cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.productName}</td>
                                <td>₹ {item.price}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger me-2"
                                        onClick={() =>
                                            item.quantity > 1 &&
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    {item.quantity}
                                    <button className="btn btn-sm btn-success ms-2"
                                        onClick={() => updateQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                        }
                                    >
                                        +
                                    </button>
                                </td>
                                <td>₹ {item.price * item.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <h4 className="mt-3">
                Grand Total: ₹ {grandTotal}
            </h4>
            <button className="btn btn-success"
                onClick=
                {handlePayment}
            >
                Checkout
            </button>
        </div>
    );
}

export default Cart;