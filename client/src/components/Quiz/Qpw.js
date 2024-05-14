import React from 'react'
import { useSelector } from 'react-redux';

const Qpw = () => {
  const email = useSelector(state => state.email);
  const topicName = useSelector(state => state.topicName);
  const subtopicName = useSelector(state => state.topicName);
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