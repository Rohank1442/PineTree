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

  const [check, setChecked] = useState(undefined);

  useEffect(() => {
    console.log(result)
  })

  const clickNext = () => {
    console.log('next')

    if (trace < queue.length) {
      dispatch(MoveNextQuestion())
      dispatch(pushAnswer(check))
    }
    setChecked(undefined)
  };

  function onChecked(check) {
    console.log(check)
    setChecked(check)
  }

  if (result.length && result.length >= queue.length) {
    return <Navigate to='/indi/result' replace={true}></Navigate>
  }

  // Timer not added
  return (
    <div className={styles.wrapper}>
      <Questions onChecked={onChecked} />
      <div className={styles.container}>
        <button className={`${styles.page_btn} ${styles.active}`} onClick={clickNext}>Next</button>
      </div>
    </div>
  );
};

export default Individual;