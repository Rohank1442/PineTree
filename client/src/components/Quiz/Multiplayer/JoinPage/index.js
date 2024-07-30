import React, { useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { MultiplayerContext } from '../Provider';

const JoinPage = () => {
    const { user } = useContext(UserContext);
    const { id: subtopicId } = useParams();
    const {onlineUsers, joinTimeLeft} = useContext(MultiplayerContext);

    return (
        <div>
            <h1>Multiplayer Page</h1>
            <h2>Online Users</h2>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
            <h2>TimeLeft: {joinTimeLeft}</h2>
        </div>
    );
};

export default JoinPage;