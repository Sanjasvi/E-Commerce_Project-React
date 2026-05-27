import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    🛒 E-Commerce
                </Link>

                <div className="ms-auto d-flex align-items-center gap-2">

                    <Link className="btn btn-outline-light btn-sm" to="/">
                        Home
                    </Link>

                    <Link className="btn btn-outline-light btn-sm" to="/products">
                        Products
                    </Link>

                    {token && role === "USER" && (
                        <>
                            <Link className="btn btn-outline-warning btn-sm" to="/cart">
                                Cart
                            </Link>

                            <Link className="btn btn-outline-info btn-sm" to="/orders">
                                Orders
                            </Link>

                            <span className="text-white small">
                                Hi, {username}
                            </span>
                        </>
                    )}

                    {token && role === "ADMIN" && (
                        <>
                            <Link className="btn btn-warning btn-sm" to="/manage-products">
                                Admin Products
                            </Link>

                            <Link className="btn btn-warning btn-sm" to="/manage-orders">
                                Admin Orders
                            </Link>

                            <span className="text-white small">
                                Admin: {username}
                            </span>
                        </>
                    )}

                    {!token ? (
                        <>
                            <Link className="btn btn-success btn-sm" to="/login">
                                Login
                            </Link>

                            <Link className="btn btn-primary btn-sm" to="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <button className="btn btn-danger btn-sm" onClick={logout}>
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;