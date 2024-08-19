import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/icon-removebg-preview.png';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoutes } from "../util/APIRoutes";

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            try {
                const { data } = await axios.post(registerRoutes, {
                    username,
                    email,
                    password,
                });
                if (!data.status) {
                    toast.error(data.msg, toastOptions);
                } else {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    navigate("/");
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again.", toastOptions);
            }
        }
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be greater than 7 characters", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>CHATTY</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        onChange={handleChange} />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        onChange={handleChange} />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        onChange={handleChange} />
                    <input 
                        type="password" 
                        placeholder="Confirm password" 
                        name="confirmPassword" 
                        onChange={handleChange} />
                    <button type="submit">Create User</button> 
                    <span>Already have an account? 
                        <Link to="/login">Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 1.3rem 4rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;

            &:hover {
                background-color: #4e0e...
            }
        }
    }
`;

export default Register;
