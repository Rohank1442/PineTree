import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const LeaderBoard = () => {
    const { quizId } = useParams();
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/leaderboard/${quizId}`);
                console.log(response)
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();
    }, [quizId]);

    if (!leaderboard) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1>Leaderboard</h1>
            <div className={styles.leaderboard}>
                {leaderboard.players.map((player, index) => (
                    <div key={player.player._id} className={styles.player}>
                        <span>{index + 1}. {player.player.name}</span>
                        <span>Score: {player.finalScore}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderBoard;