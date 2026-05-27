import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccess() {

    return (

        <div className="container mt-5 text-center">

            <h1>
                Order Placed Successfully
            </h1>

            <p>
                Thank You For Shopping
            </p>

            <Link
                to="/products"
                className=
                "btn btn-primary"
            >
                Continue Shopping
            </Link>

        </div>
    );
}

export default OrderSuccess;