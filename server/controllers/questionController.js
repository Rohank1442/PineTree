const Questions = require('../models/Question');
const QuestionTime = require('../models/QuestionTime');
const questionsData = require('../database/data');
const answers = questionsData.answers;
const questions = questionsData;

exports.getQuestions = async (req, res) => {
    try {
        // Populate the quizzes field
        const q = await Questions.find().populate('quizzes');
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
};

exports.insertQuestions = async (req, res) => {
    try {
        await Questions.insertMany({ questions, answers });
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        res.json({ error });
    }
};

exports.dropQuestions = async (req, res) => {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.json({ error });
    }
};

exports.timeQuestion = async (req, res) => {
    const { questionId, timeTaken } = req.body;
    try {
        const questionTime = new QuestionTime({ questionId, timeTaken });
        await questionTime.save();
        res.status(200).json({ message: 'Time saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving time', error });
    }
};