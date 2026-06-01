import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from "../config";

function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${API_URL}/products`,
            // 'http://localhost:8080/products',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setProducts(response.data);
    };

    const addToCart = async (product) => {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please Login First");

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

        // const token = localStorage.getItem("token");

        await axios.post(
            `${API_URL}/cart/add`,
           // 'http://localhost:8080/cart/add',
            cartData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        window.dispatchEvent(
            new Event(
                "cartUpdated"
            )
        );

        alert("Product Added To Cart");
    };

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === '' || product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (

        <div className="container mt-5">

            <h2 className="mb-4">Products</h2>

            <input
                type="text"
                placeholder="Search Products"
                className="form-control mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                className="form-select mb-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >

                <option value="">All Categories</option>

                <option value="Electronics">Electronics</option>

                <option value="Mobile">Mobile</option>

                <option value="Fashion">Fashion</option>

            </select>

            <div className="row">

                {filteredProducts.map((product) => (

                    <div className="col-md-4 mb-4" key={product.id}>

                        <div className="card shadow">

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="card-img-top"
                                style={{
                                    height: "250px",
                                    objectFit: "cover",
                                    cursor: "pointer"
                                }}

                                onClick={() =>
                                    navigate(
                                        `/product/${product.id}`
                                    )
                                }
                            />

                            <div className="card-body">

                                <h5
                                    style={{
                                        cursor: "pointer"
                                    }}

                                    onClick={() =>
                                        navigate(
                                            `/product/${product.id}`
                                        )
                                    }
                                >
                                    {product.name}
                                </h5>

                                <p>{product.description}</p>

                                <h6>₹ {product.price}</h6>

                                <p>{product.category}</p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product)}
                                >
                                    Add To Cart
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Products;