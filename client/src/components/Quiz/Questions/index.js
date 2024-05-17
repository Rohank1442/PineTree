import React, { useEffect } from 'react';
import data from '../Database/data';
import styles from './styles.module.css';

const Questions = () => {
  // const [checked, setChecked] = useState(undefined);
  const question = data[0];

  useEffect(() => {
    console.log(data);
  }, []);

  const onSelect = () => {
    console.log('radio hello hii');
  };

  return (
    <div className={styles.container}>
      <h1>{question.question}</h1>
      <ul key={question.id}>
        {question.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={onSelect()}
            />
            <label htmlFor={`q${i}-option`}>{q}</label>
            <div className={styles.check}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;