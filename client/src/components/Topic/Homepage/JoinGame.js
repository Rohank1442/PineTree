import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinGame = () => {
    const [joiningId, setJoiningId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/quiz/getQuizJoinId/${joiningId}`);
            const { subTopic } = response.data.quiz;

            navigate(`/topics/${subTopic._id}/opt`);
        } catch (error) {
            setError('Invalid Joining ID. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#151C25] p-2">
            <div className="w-full max-w-md bg-[#151C25] rounded-md shadow-md p-2">
                <h2 className="text-white text-2xl text-center font-bold uppercase text-gradient">Join Quiz</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="joiningId"
                            className="w-full border border-gray-300 rounded mt-1 p-2"
                            placeholder="Enter your Joining ID"
                            value={joiningId}
                            onChange={(e) => setJoiningId(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mb-4">{error}</div>
                    )}
                    <div className="flex justify-center">
                        <button type="submit" className="bg-[#E32970] text-white font-bold py-2 px-4 rounded hover:bg-pink-600">
                            Enter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinGame;