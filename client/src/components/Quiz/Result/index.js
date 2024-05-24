import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { resetAllAction } from '../../Redux/store';
import { resetResultAction } from '../../Redux/store';

const Result = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const subId = useSelector(state => state.subtopicId);
    console.log(subId);

    const onRestart = () => {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    return (
        <div className={styles.container}>
            <h1>Scoreboard</h1>
            <div className={styles.info}>
                <p>Email: {email}</p>
                <p>Total quiz points: 10</p>
                <p>Total questions: 10</p>
                <p>Score: 7</p>
            </div>
            {/* topics/${subId}/opt/indi */}
            <Link to={'/'} onClick={onRestart}>
                <button>Restart</button>
            </Link>
        </div>
    );
};

export default Result;
