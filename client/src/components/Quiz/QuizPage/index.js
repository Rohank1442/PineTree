import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './styles.module.css';

const QuizPage = () => {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [timer, setTimer] = useState(10);
    const email = useSelector(state => state.email);
    const { id: subTopicId } = useParams();
    const navigate = useNavigate();
    
    console.log(email)

    useEffect(() => {
        const getQuizById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quiz/getQuizData/${subTopicId}`);
                console.log(response)
                setQuiz(response.data.quiz);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        getQuizById();
    }, [subTopicId]);

    useEffect(() => {
        let timerId;
        if (timer > 0) {
            timerId = setInterval(() => setTimer(timer - 1), 1000);
        } else if (timer === 0 && currentQuestionIndex < quiz.questions.length - 1) {
            setTimer(10);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (timer === 0 && currentQuestionIndex === quiz.questions.length - 1) {
            console.log("Quiz Completed!")
            handleSubmitQuiz();
        }
        return () => clearInterval(timerId);
    }, [timer, currentQuestionIndex, quiz]);

    const handleOptionClick = (selectedOption) => {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const score = currentQuestion.answer === selectedOption ? currentQuestion.maxMarks : 0;
        setResponses([...responses, { question: currentQuestion._id, answer: selectedOption, score }]);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimer(10);
        } else {
            console.log("Quiz Completed!")
            handleSubmitQuiz();
        }
    };

    const handleSubmitQuiz = async () => {
      try {
        const finalScore = responses.reduce((total, response) => total + response.score, 0);
        await axios.post('http://localhost:5000/quiz/storeResponse', {
          player: email,
          quiz: quiz._id,
          responses,
          finalScore
        });
        // await axios.post('http://localhost:5000/leaderboard', {
        //     player: email,
        //     quiz: quiz._id,
        //     responses,
        //     finalScore
        // });
        // const leaderboardResponse = await axios.get(`http://localhost:5000/leaderboard/${quiz._id}`);
        //     const { quiz: fetchedQuiz, leaderboard } = leaderboardResponse.data;
        //     console.log(fetchedQuiz);
        //     setQuiz(fetchedQuiz);
        navigate(`/leaderboard/${quiz._id}`);
      } catch (error) {
        console.error('Error submitting quiz:', error);
      }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.questionContainer}>
                <div className={styles.box}>
                    <div className={styles.question}>{quiz.questions[currentQuestionIndex].question}</div>
                    <div className={styles.options}>
                        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
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