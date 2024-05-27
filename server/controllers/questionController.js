const Questions = require('../models/Question')
const questionsData = require('../database/data');
const answers = questionsData.answers;
const questions = questionsData;

exports.getQuestions = async (req, res) => {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

exports.insertQuestions = async (req, res) => {
    try {
        await Questions.insertMany({ questions, answers });
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        res.json({ error });
    }
}

exports.dropQuestions = async (req, res) => {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.json({ error })
    }
}
