import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import Loader from '../../../Loader';
import baseurl from '../../../Api/baseurl';

const WithoutAuth = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkUser = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            await axios.post(baseurl + "checkuser", { token });
            navigate("/");
        } catch (err) {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("reduxState");
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

export default WithoutAuth
