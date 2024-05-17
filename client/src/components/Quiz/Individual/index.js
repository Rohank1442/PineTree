import React from 'react';
import styles from './styles.module.css';
import Questions from '../Questions';

const Individual = () => {
  const clickNext = () => {
    console.log('next');
  };
  // Timer not added
  return (
    <div className={styles.wrapper}>
      <Questions />
      <div className={styles.container}>
        <button className={`${styles.page_btn} ${styles.active}`} onClick={clickNext}>Next</button>
      </div>
    </div>
  );
};

export default Individual;
