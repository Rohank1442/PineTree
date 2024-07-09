import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const Multiplayer = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(UserContext);
    const [leftTime, setLeftTime] = useState(30);
    const [gameState, setGameState] = useState('Inactive');
    const navigate = useNavigate();
    const { id: subtopicId } = useParams();
    const socketInstance = useRef(io('${process.env.REACT_APP_SERVER_NAME}user-namespace'));

    const handleTimeUp = () => {
        navigate(`/quiz/${subtopicId}`);
    }; 

    useEffect(() => {
        console.log("hello bro!");
        if (user && socketInstance) {
            console.log("hello bro!");
            socketInstance.current.on('connect', () => {
                setIsConnected(true);
                socketInstance.current.emit('userConnected', { ...user, subtopicId });
            }); 

            socketInstance.current.on('disconnect', () => {
                setIsConnected(false);
            });

            socketInstance.current.on('updateUserList', (users) => {
                setOnlineUsers(users);
            });

            socketInstance.current.on('timerUpdate', (timeLeft) => {
                setLeftTime(timeLeft);
            });

            socketInstance.current.on('gameState', (state) => {
                console.log(state)
                setGameState(state);
            });

            socketInstance.current.on('gameAlreadyStarted', () => {
                alert('Cannot join: game already ongoing.');
                navigate('/');
            })

            return () => {
                socketInstance.current.off('connect');
                socketInstance.current.off('disconnect');
                socketInstance.current.off('updateUserList');
                socketInstance.current.off('timerUpdate');
                socketInstance.current.off('gameState');
            };
        }
    }, [user, subtopicId]);

    useEffect(() => {
        if (gameState === "ongoing") {
            console.log("game started");
        }
    }, [gameState]); 

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