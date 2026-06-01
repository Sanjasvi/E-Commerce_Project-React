import React, {useEffect,useState} from "react";
import axios from "axios";
import API_URL from "../config";

function ManageProducts() {

    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await axios.get(

                    `${API_URL}/products`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setProducts(
                response.data
            );
        };

    const handleChange =
        (e) => {

            setProduct({

                ...product,

                [e.target.name]:
                    e.target.value

            });

        };

    const addProduct =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.post(

                `${API_URL}/products`,

                product,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            alert(
                "Product Added"
            );

            fetchProducts();
        };

    const updateProduct =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.put(

                `${API_URL}/products/${editingId}`,

                product,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            alert(
                "Product Updated"
            );

            setProduct({

                name: "",
                description: "",
                price: "",
                category: "",
                imageUrl: ""

            });

            setEditingId(null);

            fetchProducts();

        };

    const deleteProduct =
        async (id) => {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.delete(

                `${API_URL}/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            fetchProducts();
        };

    return (

        <div className=
            "container mt-5">

            <h2>
                Manage Products
            </h2>

            <input
                className="form-control mb-2"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                name="imageUrl"
                placeholder="Image URL"
                value={product.imageUrl}
                onChange={handleChange}
            />

            <button className="btn btn-success mb-4" onClick={editingId
                ?
                updateProduct
                :
                addProduct} >
                {/* Add Product */}
                {
                    editingId
                        ?
                        "Update Product"
                        :
                        "Add Product"
                }

            </button>

            <table className=
                "table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Price</th>

                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>₹ {p.price}</td>
                                <td>
                                    <button

                                        className=
                                        "btn btn-warning me-2"

                                        onClick={() => {

                                            setProduct({

                                                name: p.name,
                                                description: p.description,
                                                price: p.price,
                                                category: p.category,
                                                imageUrl: p.imageUrl

                                            });

                                            setEditingId(
                                                p.id
                                            );

                                        }}

                                    >

                                        Edit

                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(p.id)} >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
export default ManageProducts;