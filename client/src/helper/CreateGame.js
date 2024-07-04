import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
    const [desc, setDesc] = useState('');
    const [topicName, setTopicName] = useState('');
    const [subTopicName, setSubTopicName] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answer: '', options: ['', '', '', ''], timeAlloted: '', maxMarks: '' }]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'options') {
            newQuestions[index].options = value;
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answer: '', options: ['', '', '', ''], timeAlloted: '', maxMarks: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (questions.length < 5) {
            setError('Please add at least 5 questions.');
            return;
        }

        // Log the request payload
        console.log({
            desc,
            topicName,
            subTopicName,
            questions
        });

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.post('http://localhost:5000/quiz/', {
                desc,
                topicName,
                subTopicName,
                questions
            }, config);

            if (response.data.success) {
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            // Log the error response from the server
            console.error(err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Topic Name:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sub-Topic Name:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={subTopicName}
                        onChange={(e) => setSubTopicName(e.target.value)}
                        required
                    />
                </div>
                {questions.map((q, index) => (
                    <div key={index} className="mb-6 p-4 border border-gray-200 rounded">
                        <h4 className="text-lg font-semibold mb-2">Question {index + 1}</h4>
                        <label className="block text-gray-700">Question:</label>
                        <textarea
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            required
                        />
                        <label className="block text-gray-700">Answer:</label>
                        <input
                            type="text"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={q.answer}
                            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                            required
                        />
                        <label className="block text-gray-700">Options:</label>
                        {q.options.map((opt, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                value={opt}
                                onChange={(e) => {
                                    const newOptions = [...q.options];
                                    newOptions[optIndex] = e.target.value;
                                    handleQuestionChange(index, 'options', newOptions);
                                }}
                                required
                            />
                        ))}
                        <label className="block text-gray-700">Time Allotted (seconds):</label>
                        <input
                            type="number"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={q.timeAlloted}
                            onChange={(e) => handleQuestionChange(index, 'timeAlloted', e.target.value)}
                            required
                        />
                        <label className="block text-gray-700">Max Marks:</label>
                        <input
                            type="number"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={q.maxMarks}
                            onChange={(e) => handleQuestionChange(index, 'maxMarks', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={addQuestion}
                >
                    Add Another Question
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Create Quiz
                </button>
            </form>
        </div>
    );
};

export default CreateGame;