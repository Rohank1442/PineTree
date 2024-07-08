import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSubtopicId } from '../../Redux/store'

const Qpw = () => {
  const [, setIsLoading] = useState(true);
  const [subtopicName, setSubtopicName] = useState('');
  const [subId, setSubId] = useState('');
  const email = useSelector(state => state.email);
  const topicName = useSelector(state => state.topicName);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchSubtopic = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/topics/${id}/opt`);
        setSubId(id);
        console.log(response)
        setSubtopicName(response.data.subtopic.subTopicName);
      } catch (error) {
        console.log('Error ', error);
        setIsLoading(false);
      }
    };

    fetchSubtopic();
  }, [id]);

  dispatch(setSubtopicId(subId));

  const handleIndividualClick = () => {
    if (!email) {
      console.log("Login or signup")
      navigate('/login');
    } else {
      navigate(`/quiz/${id}`);
    }
  }

  const handleMultiplayerClick = () => {
    if (!email) {
      navigate('/login');
    } else {
      navigate(`/topics/${id}/opt/multi`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-customBackground">
      <div className="shadow-xl shadow-black rounded-md overflow-hidden bg-customBackgroundPink my-2 p-3 w-full max-w-md mx-4">
        <div className="bg-[#151c25] p-4 rounded-md">
          <div className="flex flex-col items-center text-center text-gray-200 font-assist">
            <div className="mb-2">
              Email: <span className="font-semibold text-[#E32970]">{email}</span>
            </div>
            <div className="mb-2">
              Topic Name: <span className="font-semibold text-[#E32970]">{topicName}</span>
            </div>
            <div className="mb-2">
              Subtopic Name: <span className="font-semibold text-[#E32970]">{subtopicName}</span>
            </div>
          </div>
          <div className="flex flex-col font-assist sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="bg-customBackgroundPink text-white py-2 px-4 rounded-md" onClick={handleIndividualClick}>Individual</button>
            <button className="bg-customBackgroundPink text-white py-2 px-4 rounded-md" onClick={handleMultiplayerClick}>Multiplayer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qpw;