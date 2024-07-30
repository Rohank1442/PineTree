import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../../../../Loader';
import styles from './styles.module.css';
import { MultiplayerContext } from '../Provider';



const QuizPage = () => {
    const {
        ongoingTimeLeft, 
        quiz,  
        currentQuestion, 
        isQuizComplete, 
        moveToNextQuestion, 
        handleSubmitQuiz, 
        timer, 
        setTimer,
        handleOptionClick
    } = useContext(MultiplayerContext);

    const navigate = useNavigate();

    useEffect(() => {
        let timerId;
        if (quiz && !isQuizComplete) {
            if (timer > 0) {
                timerId = setInterval(() => setTimer(prev => prev - 1), 1000);
            } else {
                moveToNextQuestion();
            }
        }

        return () => clearInterval(timerId);
    }, [timer, quiz, isQuizComplete]);

    useEffect(() => {
        if (isQuizComplete) {
            handleSubmitQuiz();
        }
    }, [isQuizComplete]);
    
    if (!quiz || !currentQuestion) {
        return <Loader />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainTimer}>
                {ongoingTimeLeft}
            </div>
            <div className={styles.questionContainer}>
                <div className={styles.box}>
                    <div className={styles.question}>{currentQuestion.question}</div>
                    <div className={styles.options}>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={styles.page_btn}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={`${styles.timer} ${timer <= 5 ? styles.red : ''}`}>{timer}</div>
            </div>
        </div>
    );
};

export default QuizPage;