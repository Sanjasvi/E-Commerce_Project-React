import React from 'react';
import { Link } from 'react-router-dom';
import ecommerceImg from "../assets/elogo.png";


function Home() {
    const role = localStorage.getItem("role");

    return (

        <div className="container mt-5 text-center bg-pink" style={{
                backgroundImage: `url(${ecommerceImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
            }}>
            <div >
                <h1 style={{ color: "black" , fontSize: "5rem", textShadow: "5px 5px 6px rgb(255, 255, 255)" }}>Welcome To E-Commerce System</h1>
                <h4 style={{fontSize:"2rem"}}>Best E-Commerce Experience</h4>

                {role === "ADMIN" ? (
                    <h5 style={{fontSize:"1.5rem"}}>You are logged in as <b>Admin</b></h5>
                ) : (
                    <h5 style={{fontSize:"1.5rem"}}>Happy Shopping 🛒</h5>
                )}
                <Link to="/products" className="btn btn-primary me-3">Shop Now</Link>
                <Link to="/cart" className="btn btn-success">View Cart</Link>
            </div>
        </div>

    );

}

export default Home;