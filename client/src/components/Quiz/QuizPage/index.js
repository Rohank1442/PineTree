import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../../../Loader';
import styles from './styles.module.css';

class Queue {
    constructor(items = []) {
        this.items = items;
    }

    dequeue() {
        return this.items.shift();
    }

    peek() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

const QuizPage = () => {
    const [quiz, setQuiz] = useState(null);
    const [questionQueue, setQuestionQueue] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [responses, setResponses] = useState(new Map());
    const [timer, setTimer] = useState(10);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const email = useSelector(state => state.email);
    const { id: subTopicId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getQuizById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}quiz/getQuizData/${subTopicId}`);
                setQuiz(response.data.quiz);
                const newQuestionQueue = new Queue(response.data.quiz.questions);
                setQuestionQueue(newQuestionQueue);
                setCurrentQuestion(newQuestionQueue.peek());
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        getQuizById();
    }, [subTopicId]);

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

    const moveToNextQuestion = () => {
        if (!questionQueue.isEmpty()) {
            const currentQ = questionQueue.dequeue();
            if (!responses.has(currentQ._id)) {
                setResponses(new Map(responses.set(currentQ._id, { answer: null, score: 0 })));
            }
            if (questionQueue.isEmpty()) {
                setIsQuizComplete(true);
            } else {
                setCurrentQuestion(questionQueue.peek());
                setTimer(10);
            }
        } else {
            setIsQuizComplete(true);
        }
    };

    const handleOptionClick = (selectedOption) => {
        const score = currentQuestion.answer === selectedOption ? currentQuestion.maxMarks : 0;
        setResponses(new Map(responses.set(currentQuestion._id, { answer: selectedOption, score })));
        moveToNextQuestion();
    };

    const handleSubmitQuiz = async () => {
        try {
            const responsesArray = Array.from(responses.entries()).map(([questionId, response]) => ({
                question: questionId,
                ...response
            }));
            const finalScore = responsesArray.reduce((total, response) => total + response.score, 0);

            await axios.post(`${process.env.REACT_APP_SERVER_NAME}quiz/storeResponse`, {
                player: email,
                quiz: quiz._id,
                responses: responsesArray,
                finalScore
            });

            await axios.post(`${process.env.REACT_APP_SERVER_NAME}leaderboard/`, {
                quiz: quiz._id,
                player: email,
                responses: responsesArray,
                finalScore
            });

            navigate(`/leaderboard/${quiz._id}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (!quiz || !currentQuestion) {
        return <Loader />;
    }

    return (
        <div className={styles.wrapper}>
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