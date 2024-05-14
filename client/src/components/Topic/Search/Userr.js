import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTopicNames } from '../../Redux/store';

const Userr = ({ user }) => {
    const dispatch = useDispatch();
    console.log(user);
    dispatch(setTopicNames(user?.topicName))

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