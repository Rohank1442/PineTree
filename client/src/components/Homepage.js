import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Link, useNavigate } from 'react-router-dom';


const Homepage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/signup')
    }

    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            <p>This is a simple React homepage component.</p>
            <div className="flex justify-center items-center">
                <button type="submit" class="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                    Log In
                </button>
            </div>
            <div className="flex justify-center items-center m-2 p-2">
                <button type="submit" class="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleSignup}>
                    Sign up
                </button>
            </div>
        </div>
    )
}

export default Homepage;