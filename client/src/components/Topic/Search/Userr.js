import React from 'react';
import { Link } from 'react-router-dom';

const Userr = ({ user }) => {
    const imageUrl = user?.imageUrl ? user.imageUrl.replace(/\\/g, '/') : '';
    const fullImageUrl = `http://localhost:5000/${imageUrl}`;
    return (
        <article className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <img src={fullImageUrl} alt={`${user?.topicName}`} className="w-full h-64 object-cover" />
            {console.log(`http://localhost:5000/${user?.imageUrl}`)}
            <h2 className="text-white font-semibold">
                <Link to={`/topics/${user?._id}`}>{`${user?.topicName}`}</Link>
            </h2>
            <p className="text-gray-400 text-sm my-1">Creator: {user?.creator.username}</p>
        </article>
    );
};

export default Userr;