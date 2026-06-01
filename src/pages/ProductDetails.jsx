import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from "../config";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        const response = await axios.get(
            `${API_URL}/products/${id}`,
            //`http://localhost:8080/products/${id}`
        );

        setProduct(response.data);
    };

    const addToCart = async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {

            alert(
                "Please Login First"
            );

            navigate("/login");

            return;
        }

        const userId =
            localStorage.getItem(
                "userId"
            );


        const cartData = {

            userId: userId,
            product_id: product.id,
            productName: product.name,
            quantity: 1,
            price: product.price
        };

        await axios.post(
            `${API_URL}/cart/add`,
            cartData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        window.dispatchEvent(
            new Event(
                "cartUpdated"
            )
        );

        alert(
            "Added To Cart"
        );
    };

    return (

        <div className="container mt-5">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="img-fluid"
                    />

                </div>

                <div className="col-md-6">

                    <h2>
                        {product.name}
                    </h2>

                    <p>
                        {product.description}
                    </p>

                    <h4>
                        ₹ {product.price}
                    </h4>

                    <p>
                        Category:
                        {product.category}
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={addToCart}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;