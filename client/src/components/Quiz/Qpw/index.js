import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Qpw = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subtopicName, setSubtopicName] = useState('');
  const email = useSelector(state => state.email);
  const topicName = useSelector(state => state.topicName);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubtopic = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/topics/${id}/opt`);
        // console.log(response)
        // console.log(response.data.subtopic.subTopicName)
        setSubtopicName(response.data.subtopic.subTopicName);
      } catch (error) {
        console.log('Error ', error);
        setIsLoading(false);
      }
    };

    fetchSubtopic();
  }, [id]);

  const handleIndividualClick = () => {
    navigate(`/topics/${id}/opt/indi`);
  }

  const handleMultiplayerClick = () => {
    navigate(`/topics/${id}/opt/multi`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Never give up!</div>
      <div className={styles.details}>
        <div className={styles.detail}>
          Email: <span>{email}</span>
        </div>
        <div className={styles.detail}>
          Topic Name: <span>{topicName}</span>
        </div>
        <div className={styles.detail}>
          Subtopic Name: <span>{subtopicName}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleIndividualClick}>Individual</button>
          <button className={styles.button} onClick={handleMultiplayerClick}>Multiplayer</button>
        </div>
      </div>
    </div>
  )
}

export default Qpw