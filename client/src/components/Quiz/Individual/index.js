import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import Questions from '../Questions';
import data from '../Database/data';
import { useSelector } from 'react-redux';

const Individual = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const state = useSelector(state => state);

  useEffect(() => {
    // console.log(state)
  })

  const clickNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // prevIndex < data.length ? prevIndex+1 : 0;
    })
  };
  // Timer not added
  return (
    <div className={styles.wrapper}>
      <Questions currentQuestionIndex={currentQuestionIndex} />
      <div className={styles.container}>
        <button className={`${styles.page_btn} ${styles.active}`} onClick={clickNext}>Next</button>
      </div>
    </div>
  );
};

export default Individual;
