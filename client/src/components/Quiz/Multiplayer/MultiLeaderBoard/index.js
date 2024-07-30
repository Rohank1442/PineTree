import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../../Loader'
import styles from './styles.module.css';

const MultiplayerLeaderBoard = () => {
    const { leaderboardId } = useParams();
    const [leaderboard, setLeaderboard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}multi/leaderboard/${leaderboardId}`);
                console.log(response.data.players);
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, [leaderboardId]);

    if (!leaderboard) {
        return <Loader />;
    }

    return (
        <div className={styles.wrapper}>
            <h1>Leaderboard</h1>
            <button onClick={() => navigate('/')}>Home</button>
            <div className={styles.leaderboard}>
                {leaderboard.players.map((playerData, index) => (
                    <div key={playerData.player._id} className={styles.player}>
                        <span> {playerData.player.username}</span>
                        <span>Score: {playerData.finalScore}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiplayerLeaderBoard;