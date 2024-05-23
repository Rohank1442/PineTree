import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useFetchQuestion } from '../../../hooks/FetchQuestion';
import { useSelector } from 'react-redux';

const Questions = () => {
  // const [checked, setChecked] = useState(undefined);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const questions = useSelector(state => state.questions.queue[state.questions.trace]);
  const trace = useSelector(state => state.questions.trace)

  useEffect(() => {
    // console.log(isLoading);
    // console.log(apiData);
    // console.log(serverError);
    console.log(questions)
  });

  const onSelect = () => {
    // console.log('radio hello hii');
  };

  if (isLoading) return <h3>isLoading</h3>
  if (serverError) return <h3>{serverError || "Unknown Error"}</h3>

  return (
    <div className={styles.container}>
      <h1>{questions?.question}</h1>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
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