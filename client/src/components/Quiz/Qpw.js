import React from 'react'
import { useSelector } from 'react-redux';

const Qpw = () => {
  const email = useSelector(state => state.email);
  return (
    <div>
      <div>Never give up!</div>
      <div>Email: {email}</div>
    </div>
  )
}

export default Qpw