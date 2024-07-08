import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../Api/baseurl';

const Signup = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfrmPass, setCnfrmPass] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate('');

    const handlePassChange = (e) => {
        console.log(username, email, password, cnfrmPass);
        setPassword(e.target.value);
    };

    const handleCnfrmPassChange = (e) => {
        setCnfrmPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
        console.log(passwordRegex.test(password));
        if (!passwordRegex.test(password)) {
            console.log("here1");
            setPasswordError(true);
            alert('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        console.log(password)
        if (password !== cnfrmPass) {
            alert('Password did not match')
        } else {
            console.log("here2")
            axios.post(baseurl + '/signup', { username, email, password, cnfrmPass })
                .then(result => {
                    console.log(result);
                    navigate('/login')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center">
            <div className="border-2 rounded-md w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 m-2 p-2 bg-white bg-opacity-90 shadow-lg">
                <div className="flex justify-center m-2">
                    <div className="text-2xl font-bold text-customBackground">Sign Up</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="m-2 p-2 flex flex-col">
                        <div className="p-1">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="p-1">
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="p-1">
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Password"
                                value={password}
                                onChange={handlePassChange}
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <div className="p-1">
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Confirm Password"
                                value={cnfrmPass}
                                onChange={handleCnfrmPassChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="m-2 text-red-500">Already have an account?</p>
                        <Link to="/login" className="text-blue-500">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup