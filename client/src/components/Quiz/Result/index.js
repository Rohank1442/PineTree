import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Result = () => {
    const email = useSelector(state => state.email);
    const subId = useSelector(state => state.subtopicId);
    console.log(subId);

    return (
        <div className={styles.container}>
            <h1>Scoreboard</h1>
            <div className={styles.info}>
                <p>Email: {email}</p>
                <p>Total quiz points: 10</p>
                <p>Total questions: 10</p>
                <p>Score: 7</p>
            </div>
            <Link to={`/topics/${subId}/opt/indi`}>
                <button>Restart</button>
            </Link>
        </div>
    );
};

export default Result;
