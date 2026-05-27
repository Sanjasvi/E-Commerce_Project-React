import React, { useState }
    from "react";

import axios from "axios";

import {
    useNavigate
}
    from "react-router-dom";

function Login() {

    const navigate =

        useNavigate();

    const [email, setEmail] =

        useState("");

    const [password, setPassword] =

        useState("");

    const [role, setRole] =

        useState("USER");

    const handleLogin =

        async () => {

            const response =

                await axios.post(

                    "http://localhost:8080/users/login",

                    {

                        email,

                        password,

                        role

                    }

                );

            if (

                response.data.message

            ) {

                alert(

                    response.data.message

                );

                return;

            }

            localStorage.setItem(

                "token",

                response.data.token

            );

            localStorage.setItem(

                "userId",

                response.data.userId

            );

            localStorage.setItem(

                "username",

                response.data.name

            );

            localStorage.setItem(

                "role",

                response.data.role

            );

            alert(

                "Login Successful"

            );

            navigate("/");

            window.location.reload();

        };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow" style={{ width: "400px" }}>

                <h3 className="text-center mb-3">Login</h3>

                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>

                <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <a href="/register">Register here</a>  
                </div> 
                

            </div>
        </div>

    );
}

export default Login;