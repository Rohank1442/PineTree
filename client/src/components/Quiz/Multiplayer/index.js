import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000/user-namespace');

const Multiplayer = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(UserContext);
    const [leftTime, setLeftTime] = useState(30);
    const [gameState, setGameState] = useState('Inactive');
    const navigate = useNavigate();
    const { id: subtopicId } = useParams();

    const handleTimeUp = () => {
        navigate(`/quiz/${subtopicId}`);
    };

    useEffect(() => {
        if (user) {
            socket.on('connect', () => {
                setIsConnected(true);
                socket.emit('userConnected', { ...user, subtopicId });
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });

            socket.on('updateUserList', (users) => {
                setOnlineUsers(users);
            });

            socket.on('timerUpdate', (timeLeft) => {
                setLeftTime(timeLeft);
            });

            socket.on('gameState', (state) => {
                console.log(state)
                setGameState(state);
                if (state === 'ongoing') {
                    alert('Cannot join: game already ongoing.');
                    navigate('/');
                }
            });

            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('updateUserList');
                socket.off('timerUpdate');
                socket.off('gameState');
            };
        }
    }, [user, subtopicId]);

    useEffect(() => {
        if (leftTime === 0) {
            handleTimeUp();
        }
    }, [leftTime]);

    return (
        <div>
            <h1>Multiplayer Page</h1>
            <h2>Online Users</h2>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
            <h2>TimeLeft: {leftTime}</h2>
        </div>
    );
};

export default Multiplayer;