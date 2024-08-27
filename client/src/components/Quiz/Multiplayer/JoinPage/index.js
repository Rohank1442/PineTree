import React, { useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { MultiplayerContext } from '../Provider';

const JoinPage = () => {
    const { user } = useContext(UserContext);
    const { id: subtopicId } = useParams();
    const { onlineUsers, joinTimeLeft } = useContext(MultiplayerContext);

    return (
        <div className="max-w-lg mx-auto p-8 rounded-xl bg-[#151C25] shadow-2xl">
            <h1 className="text-center text-[#E32970] text-4xl font-extrabold mb-6">Multiplayer Page</h1>
            <h2 className="text-center text-[#E32970] text-2xl font-semibold mb-4">Online Users</h2>
            <ul className="space-y-4">
                {onlineUsers.map((user) => (
                    <li 
                        key={user.id} 
                        className="py-3 px-4 bg-[#1A2430] rounded-lg flex items-center justify-between shadow-md"
                    >
                        <span>{user.email}</span>
                        <span className="text-sm text-gray-400">Online</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8 text-center">
                <h2 className="text-[#E32970] text-3xl font-semibold">Time Left</h2>
                <p className="text-[#E32970] text-6xl font-bold mt-4">{joinTimeLeft}</p>
            </div>
        </div>
    );
};

export default JoinPage;
