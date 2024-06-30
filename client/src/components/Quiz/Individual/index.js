import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Questions from '../Questions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MoveNextQuestion } from '../../../hooks/FetchQuestion';
import { pushAnswer } from '../../../hooks/setResult';
import { Navigate } from 'react-router-dom';

const Individual = () => {
  const dispatch = useDispatch();

  const { queue, trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [check, setChecked] = useState(undefined);
  const [quizFinished, setQuizFinished] = useState(false);

  const clickNext = () => {
    console.log('next')
    console.log(currentQuestionIndex)
    dispatch(pushAnswer(check))
    setChecked(undefined)

    if (currentQuestionIndex < queue.length) {
      console.log("Index: ", currentQuestionIndex)
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(20);
      dispatch(MoveNextQuestion())
    } else {
      setQuizFinished(true);
    }
  };

  function onChecked(check) {
    console.log(check)
    setChecked(check)
  }

  useEffect(() => {
    if (result.length && result.length >= queue.length) {
      setQuizFinished(true)
    }
  }, [result, queue.length]);

  if (quizFinished) {
    return <Navigate to='/indi/result' replace={true}></Navigate>
  }

  return (
    <div className={styles.wrapper}>
      <Questions currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} onChecked={onChecked} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <div className={styles.container}>
        <button className={`${styles.page_btn} ${styles.active}`} onClick={clickNext}>Next</button>
      </div>
    </div>
  );
};

export default Individual;