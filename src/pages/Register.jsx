import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Register() {

    const [user, setUser] = useState({

        name: "",
        email: "",
        password: "",
        role: "USER"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]:

                e.target.value

        });

    };

    const handleRegister =

        async () => {

            await axios.post(
                `${API_URL}/users/register`,
                //"http://localhost:8080/users/register",

                user

            );

            alert(

                "Registration Successful"

            );

        };

    return (

        <div className="container mt-5 d-flex justify-content-center">

            <div className="card p-4 shadow" style={{ width: "400px" }}>

                <h3 className="text-center mb-3">Register</h3 >

                <input

                    type="text"

                    name="name"

                    placeholder="Enter Name"

                    className="form-control mb-3"

                    onChange={handleChange}

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Enter Email"

                    className="form-control mb-3"

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Enter Password"

                    className="form-control mb-3"

                    onChange={handleChange}

                />

                <select

                    name="role"

                    className="form-control mb-3"

                    value={user.role}

                    onChange={handleChange}

                >

                    <option value="USER">

                        Register As User

                    </option>

                    <option value="ADMIN">

                        Register As Admin

                    </option>

                </select>

                <button

                    className="btn btn-success w-100"

                    onClick={handleRegister}
                >
                    Register

                </button>

            </div>
        </div>

    );

}

export default Register;