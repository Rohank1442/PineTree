import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { resetAllAction } from '../../Redux/store';
import { resetResultAction } from '../../Redux/store';
import { attempts_Number, earnPoints_Number, flagResult } from '../../../helper';

const Result = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.email);
    const subId = useSelector(state => state.subtopicId);
    console.log(subId);
    const { questions: { queue, answers }, result: { result, userEmail } } = useSelector(state => state);

    useEffect(() => {
        console.log(flag)
    })

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints)

    const onRestart = () => {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    return (
        <div className={styles.container}>
            <h1>Scoreboard</h1>
            <div className={styles.info}>
                <p>Email: {email}</p>
                <p>Total quiz points: {totalPoints || 0}</p>
                <p>Total questions: {queue.length || 0} </p>
                <p>Total attempts: {attempts || 0} </p>
                <p>Score: {earnPoints} </p>
                <div>
                    <span>Quiz Result</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} > {flag ? "Passed" : "Failed"} </span>
                </div>
            </div>
            {/* topics/${subId}/opt/indi */}
            <Link to={'/'} onClick={onRestart}>
                <button>Restart</button>
            </Link>
        </div>
    );
};

export default Result;
