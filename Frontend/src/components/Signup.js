import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../Api/baseurl';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cnfrmPass, setCnfrmPass] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, password, cnfrmPass);
        axios.post(baseurl + '/signup', { name, email, password, cnfrmPass })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return (
        <div class="flex items-center justify-center h-screen">
            <div class="border-2 rounded-md w-1/5 m-2 p-2 bg-slate-300">
                <div class='flex justify-center m-2'>
                    <div class='text-2xl'>Sign Up</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class='m-2 p-2 flex flex-col'>
                        <div class='p-1'>
                            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class='p-1'>
                            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class='p-1'>
                            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class='p-1'>
                            <input type='password' placeholder='Confirm Password' onChange={(e) => setCnfrmPass(e.target.value)} />
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <button class="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                            SignUp
                        </button>
                    </div>
                    <p class="m-2 p-2">Already have an account</p>
                    <div class="mt-[-10px] ml-[4px]">
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup