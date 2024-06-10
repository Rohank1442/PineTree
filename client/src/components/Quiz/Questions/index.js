import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from './styles.module.css';
import { useFetchQuestion } from '../../../hooks/FetchQuestion';
import { useSelector } from 'react-redux';
import Timer from '../Timer';

const Questions = ({ onChecked, currentQuestionIndex, setCurrentQuestionIndex, timeLeft, setTimeLeft }) => {
  const [{ isLoading, serverError }] = useFetchQuestion();
  const questions = useSelector(state => state.questions.queue);
  // const questions = queue[currentQuestionIndex];
  // const trace = useSelector(state => state.questions.trace)
  // useSelector(state => console.log(state))
  // console.log(trace.length)

  const handleTimeUp = async () => {
    console.log("No ")
    try {
      await axios.post('http://localhost:5000/api/save-time', {
        questionId: questions[currentQuestionIndex].id,
        timeTaken: 20 - timeLeft
      });

      console.log(currentQuestionIndex)
      if(currentQuestionIndex < questions.length-1){
        console.log("Yes")
        setCurrentQuestionIndex(currentQuestionIndex+1);
        setTimeLeft(20);
      } else {
        console.log('Quiz finished');
      }
    }
    catch (error) {
      console.log('Error saving time: ', error);
    }
  }

  const onSelect = (i) => {
    onChecked(i)
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft == 1) {
          console.log("hello", timeLeft);
          handleTimeUp();
          return 0;
        }
        else {
          const newTimeLeft = prevTimeLeft - 1;
          return newTimeLeft;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, handleTimeUp]);

  if (isLoading) return <h3>isLoading</h3>
  if (serverError) return <h3>{serverError || "Unknown Error"}</h3>
  return (
    <div className={styles.container}>
      <h1>{questions[currentQuestionIndex]?.question}</h1>
      <ul key={questions[currentQuestionIndex]?.id}>
        {questions[currentQuestionIndex]?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label htmlFor={`q${i}-option`}>{q}</label>
            <div className={styles.check}></div>
          </li>
        ))}
        <div>
          <Timer timeLeft={timeLeft} />
        </div>
      </ul>
    </div>
  );
};

export default Questions;