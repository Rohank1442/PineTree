import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../Api/baseurl';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(name, email, password, cnfrmPass);
        axios.post(baseurl + '/login', { email, password })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border-2 rounded-md w-1/5 m-2 p-2 bg-slate-300">
                <div className="flex justify-center m-2">
                    <div className="text-2xl">Login</div>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="m-2 p-2 flex flex-col">
                        <label htmlFor="email" className="p-1">
                            Email
                        </label>
                        <div className="p-1">
                            <input
                                type="email"
                                id="email"
                                size="28"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <label htmlFor="password" className="p-1">
                            Password
                        </label>
                        <div className="p-1">
                            <input
                                type="password"
                                id="password"
                                size="28"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>
                            Log In
                        </button>
                    </div>
                    <div className="m-2 p-2">
                        Forget Password? <span>Click here!</span>
                    </div>
                    <div className="mt-[-10px] ml-[14px]">
                        <Link to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;