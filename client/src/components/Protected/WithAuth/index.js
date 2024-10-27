import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../../../Loader';
import axios from "axios"
import baseurl from '../../../Api/baseurl';

const WithAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.post(baseurl + "checkuser", { token });
        } catch (err) {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("reduxState");
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        loading
        ?
        <Loader />
        :
        <div>
            <Outlet />
        </div>
    )
}

export default WithAuth
