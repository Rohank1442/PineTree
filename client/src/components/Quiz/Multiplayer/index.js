import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../Context/UserContext';

const socket = io('http://localhost:5000/user-namespace');

const Multiplayer = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(UserContext);
    console.log(user)

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);

            socket.emit('userConnected', user);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        socket.on('updateUserList', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('updateUserList');
        };
    }, [user]);

    return (
        <div>
            <h1>Multiplayer Page</h1>
            <h2>Online Users</h2>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Multiplayer;