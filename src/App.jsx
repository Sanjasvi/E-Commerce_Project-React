import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProductDetails from './pages/ProductDetails';
import OrderSuccess from './pages/OrderSuccess';
import ManageOrders from './pages/ManageOrders';
import ManageProducts from './pages/ManageProducts';
import AdminRoute from "./components/AdminRoute";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />



                <Route
                    path="/products"
                    element={
                        // <ProtectedRoute>
                        <Products />
                        // </ProtectedRoute>
                    }
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route

                    path="/manage-products"

                    element={
                        <AdminRoute>

                            <ManageProducts />

                        </AdminRoute>
                    }

                />


                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-orders"
                    element={
                        <AdminRoute>
                            <ManageOrders />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />



            </Routes>

        </BrowserRouter>
    );
}

export default App;