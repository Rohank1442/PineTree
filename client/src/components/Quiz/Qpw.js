import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Qpw = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subtopicName, setSubtopicName] = useState('');
  const email = useSelector(state => state.email);
  const topicName = useSelector(state => state.topicName);
  const { id } = useParams();
  // console.log(id)

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
  // console.log("subtopicName ->", subtopicName)
  return (
    <div>
      <div>Never give up!</div>
      <div>Email: {email}</div>
      <div>Topicname: {topicName}</div>
      <div>Subtopicname: {subtopicName}</div>
    </div>
  )
}

export default Qpw