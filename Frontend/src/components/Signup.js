import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../Api/baseurl';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfrmPass, setCnfrmPass] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handlePassChange = (e) => {
        console.log(name, email, password, cnfrmPass);
        setPassword(e.target.value);
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     setPasswordError('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
        //     // alert('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
        //     // return;
        // }
    };
    
    const handleCnfrmPassChange = (e) => {
        setCnfrmPass(e.target.value);
        // if (password !== cnfrmPass) {
        //     console.log('Password did not match')
        //     // return;
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const { password, cnfrmPass } = this.state;
        // console.log(name, email, password, cnfrmPass);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log("here1");
            setPasswordError(true);
            alert('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
            // return;
        }
        if (password !== cnfrmPass) {
            alert('Password did not match')
            // return;
        }
        else{
            console.log("here2")
            axios.post(baseurl + '/signup', { name, email, password, cnfrmPass })
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
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
                            <input
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class='p-1'>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class='p-1'>
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={handlePassChange} />
                            {passwordError && <p class="error">{passwordError}</p>}
                        </div>
                        <div class='p-1'>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                value={cnfrmPass}
                                onChange={handleCnfrmPassChange} />
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