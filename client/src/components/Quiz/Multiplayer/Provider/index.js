import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../Context/UserContext';
import socket from '../../../../Api/socket';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../Context/ConnectionContext';

export const MultiplayerContext = createContext();

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

const Provider = ({children}) => {
    const {socketInstance} = useContext(SocketContext);
    const email = useSelector(state => state.email);
    const { id: subtopicId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questionQueue, setQuestionQueue] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [joinTimeLeft, setJoinTimeLeft] = useState(30);
    const [ongoingTimeLeft, setOngoingTimeLeft] = useState(180);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [responses, setResponses] = useState(new Map());
    const [gameState, setGameState] = useState('Inactive');
    const [timer, setTimer] = useState(10);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const joinGame = () => {
        console.log("joining game...");
        if (socketInstance.current?.connected) {
            socketInstance.current.emit('joinGame', { ...user, subtopicId });
        }
    }

    const leaveGame = () => {
        if (socketInstance.current?.connected) {
            socketInstance.current.emit('leaveGame', { ...user, subtopicId });
        }
    }

    const getQuizById = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}quiz/getQuizData/${subtopicId}`);
            setQuiz(response.data.quiz);
            const newQuestionQueue = new Queue(response.data.quiz.questions);
            setQuestionQueue(newQuestionQueue);
            setCurrentQuestion(newQuestionQueue.peek());
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleOptionClick = (selectedOption) => {
        const score = currentQuestion.answer === selectedOption ? currentQuestion.maxMarks : 0;
        setResponses(new Map(responses.set(currentQuestion._id, { answer: selectedOption, score })));
        moveToNextQuestion();
    };

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

    const handleSubmitQuiz = async (leaderboardId) => {
        try {
            const responsesArray = Array.from(responses.entries()).map(([questionId, response]) => ({
                question: questionId,
                ...response
            }));
            const finalScore = responsesArray.reduce((total, response) => total + response.score, 0);

            const res = await axios.post(`${process.env.REACT_APP_SERVER_NAME}multi/leaderboard`, {
                _id: leaderboardId,
                quiz: quiz._id,
                subtopicId: subtopicId,
                player: email,
                responses: responsesArray,
                finalScore
            });

            navigate(`/multi/leaderboard/${res.data.data.leaderboardId}`, {replace: true});
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const initialiseGame = async () => {
        await getQuizById();
        joinGame();
    }

    useEffect(() => {
        return () => {
            user && leaveGame();
        }
    }, [])

    useEffect(() => {
        console.log("connection status:", socketInstance.current.connected);
        if (user && socketInstance.current.connected) {
            initialiseGame();
        }
    }, [user])

    useEffect(() => {
        if (user && socketInstance.current.connected) {
            socketInstance.current.on('disconnect', () => {
                console.log("disconnected");
            });
    
            socketInstance.current.on('updateUserList', (users) => {
                setOnlineUsers(users);
            });
    
            socketInstance.current.on('joinTimerUpdate', (timeLeft) => {            
                setJoinTimeLeft(timeLeft);
                if (timeLeft === 0) {
                    navigate(`/topics/${subtopicId}/multi/quiz`, {replace: true});
                }
            });

            socketInstance.current.on('ongoingTimerUpdate', (timeLeft) => {
                setOngoingTimeLeft(timeLeft);
            })

            socketInstance.current.on('quizFinished', (leaderboardId) => {
                console.log("quiz over", leaderboardId);
                handleSubmitQuiz(leaderboardId);
            })
    
            socketInstance.current.on('gameState', (state) => {
                console.log(state);
                setJoinTimeLeft(30);
                setOngoingTimeLeft(180);
                setGameState(state);
            });
    
            socketInstance.current.on('gameAlreadyStarted', () => {
                alert('Cannot join: game already ongoing.');
                navigate(-1);
            })
        }

        return () => {
            socketInstance.current.off('connect');
            socketInstance.current.off('disconnect');
            socketInstance.current.off('updateUserList');
            socketInstance.current.off('timerUpdate');
            socketInstance.current.off('gameState');
        };
    }, [user, gameState]);

    return (
        <MultiplayerContext.Provider value={{
            joinGame, 
            leaveGame,
            setIsQuizComplete,
            setTimer,
            moveToNextQuestion,
            handleSubmitQuiz,
            handleOptionClick,
            onlineUsers,
            joinTimeLeft,
            ongoingTimeLeft,
            quiz, 
            questionQueue,
            currentQuestion, 
            timer,
            isQuizComplete, 
            gameState,
            socketInstance
        }}>
            {children}
        </MultiplayerContext.Provider>
    )
}

export default Provider;