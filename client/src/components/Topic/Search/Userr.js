import React from 'react';
import { Link } from 'react-router-dom';

const Userr = ({ user }) => {
    return (
        <article>
            <h2>
                <Link to={`/topics/${user?._id}`}>{`${user?.topicName}`}</Link>
            </h2>
            <p>Creator: {user?.creator.username}</p>
            <p>Email: {user?.creator.email}</p>
            <p>User ID: {user?._id}</p>
        </article>
    );
};

export default Userr;