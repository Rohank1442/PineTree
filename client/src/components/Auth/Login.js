import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../Api/baseurl';
import { useDispatch } from 'react-redux';
import { setEmails } from '../Redux/store';
import { UserContext } from '../Context/UserContext';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseurl + 'login', { email, password }, { withCredentials: true });
            if (response.status === 200) {
                const { email, token, Id } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ email, id: Id }));
                dispatch(setEmails(email));
                setUser({ email, id: Id });
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center bg-customBackground">
            <div className="border-2 rounded-md w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 m-2 p-6 bg-white bg-opacity-95 shadow-lg">
                <form onSubmit={handleLogin}>
                    <div className="m-2 p-2 flex flex-col text-customBackground">
                        <label htmlFor="email" className="p-1">
                            Email
                        </label>
                        <div className="p-1">
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <label htmlFor="password" className="p-1">
                            Password
                        </label>
                        <div className="p-1">
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
                            Log In
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const res = await axios.post(baseurl + 'google-login', {
                                        token: credentialResponse.credential
                                    }, { withCredentials: true });

                                    const { email, token, Id } = res.data;
                                    localStorage.setItem('token', token);
                                    localStorage.setItem('user', JSON.stringify({ email, id: Id }));
                                    dispatch(setEmails(email));
                                    setUser({ email, id: Id });
                                    navigate('/');
                                } catch (err) {
                                    console.error('Google login error:', err);
                                    setError('Google login failed');
                                }
                            }}
                            onError={() => {
                                setError('Google login failed');
                            }}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center my-2">{error}</div>
                    )}
                    <div className="m-2 p-2 text-center text-customBackground">
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;