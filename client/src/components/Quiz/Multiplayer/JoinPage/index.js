import React, { useContext } from 'react';
import { MultiplayerContext } from '../Provider';

const JoinPage = () => {
    const { onlineUsers, joinTimeLeft } = useContext(MultiplayerContext);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
            <div className="max-w-md w-full p-6 rounded-lg bg-[#151C25] shadow-lg">
                <h1 className="text-center text-[#E32970] text-3xl font-bold mb-4">
                    Multiplayer Lobby
                </h1>

                <ul className="space-y-3">
                    {onlineUsers.map((user) => (
                        <li 
                            key={user.id} 
                            className="py-2 px-3 bg-[#1A2430] rounded-md flex items-center justify-between shadow-md hover:bg-[#2b3442] transition-colors"
                        >
                            <span className="text-sm text-white">{user.email}</span>
                            <span className="text-xs text-gray-400">Online</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 text-center">
                    <h2 className="text-[#E32970] text-2xl font-semibold">
                        Time Left
                    </h2>
                    <p className="text-[#E32970] text-4xl font-bold mt-3">
                        {joinTimeLeft}
                    </p>

                    <div className="mt-2 h-2 w-36 bg-gray-700 rounded-full mx-auto">
                        <div 
                            className="h-full bg-[#E32970] rounded-full"
                            style={{ width: `${(30 - joinTimeLeft) * 3.33}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
