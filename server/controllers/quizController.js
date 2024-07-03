const PlayerResponse = require("../models/PlayerResponse");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Topic = require("../models/Topic");
const SubTopic = require("../models/SubTopic");
const User = require("../models/userSchema")
const randomatic = require('randomatic');
const alphabet = "0123456789qwertyuiopasdfghjklzxcvbnm!@#$%^&*/QWERTYUIOPASDFGHJKLZXCVBNM"

const mapErrorDetails = (err) => {
    const msg = err.details.map(el => el.message).join(',')
    return msg;
}

const createNewQuiz = async (req, res) => {
    try {
        const { desc, topicName, subTopicName, questions } = req.body;
        if (!topicName || !subTopicName || !questions || questions.length < 5) {
            return res.json({
                success: false,
                message: "Topic, Subtopics and Minimum 5 questions are necessary to be provided"
            });
        }

        questions.forEach((quest) => {
            if (!quest.question || !quest.answer || !quest.options || !quest.timeAlloted || !quest.maxMarks || quest.options.length !== 4) {
                return res.status(400).json({
                    success: false,
                    message: "All the questions must contain question, answer, maxMarks, time for the questions and 4 options"
                })
            }
        });

        let topic = await Topic.findOne({ topicName });
        if (!topic) {
            topic = new Topic({ topicName, creator: req.user._id });
            await topic.save();
        }

        let subTopic = await SubTopic.findOne({ subTopicName, topic: topic._id });
        if (!subTopic) {
            subTopic = new SubTopic({ subTopicName, topic: topic._id, creator: req.user._id });
            await subTopic.save();

            topic.subTopics.push(subTopic._id);
            await topic.save();
        }

        const quiz = new Quiz();
        quiz.desc = desc;
        quiz.creator = req.user._id;
        quiz.topic = topic._id;
        quiz.subTopic = subTopic._id;

        let id = randomatic(alphabet, 6);
        let q = await Quiz.findOne({ joiningId: id });
        while (q) {
            id = randomatic(alphabet, 6);
            q = await Quiz.findOne({ joiningId: id });
        }
        quiz.joiningId = id;
        await quiz.save();

        const questionIds = await Promise.all(questions.map(async (quest) => {
            const q = new Question({
                question: quest.question,
                answer: quest.answer,
                options: quest.options,
                quiz: quiz._id,
                timeAlloted: quest.timeAlloted,
                maxMarks: quest.maxMarks
            });
            await q.save();
            return q._id;
        }));

        quiz.questions = questionIds;
        await quiz.save();

        return res.status(200).json({ success: true, quiz });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const acceptJoinings = async (req, res) => {
    try {
        const { quizId } = req.body;
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Please Provide the quiz Id"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(400).json({
                success: false,
                message: "Quiz not found with the Id provided"
            })
        }

        console.log("Quiz Creator:", quiz.creator);
        console.log("Logged-in User:", req.user._id);

        if (quiz.creator.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You are not the Creater of the quiz"
            });
        }
        quiz.isActive = "Joining";
        await quiz.save();
        return res.status(200).json({
            success: true,
            message: "Joinings have started"
        });
    } catch (error) {
        const message = mapErrorDetails(error);
        return res.status(400).json({
            status: false,
            message: message
        });
    }
}

const startQuiz = async (req, res) => {
    try {
        const { quizId } = req.body;
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Please Provide the quiz Id"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(400).json({
                success: false,
                message: "Quiz not found with the Id provided"
            })
        }
        if (quiz.creator !== req.user) {
            return res.status(400).json({
                success: false,
                message: "You are not the Creater of the quiz"
            });
        }
        quiz.isActive = "Active";
        await quiz.save();
        return res.status(200).json({
            success: true,
            message: "The quiz will start in 30 Sec"
        });
    } catch (error) {
        const message = mapErrorDetails(error);
        return res.status(400).json({
            status: false,
            message: message
        });
    }
}

const getQuizById = async (req, res) => {
    try {
        const { subTopicId } = req.params;
        console.log(subTopicId)
        const quiz = await Quiz.findOne({ subTopic: subTopicId })
            .populate('topic')
            .populate('subTopic')
            .populate({
                path: 'questions',
                select: 'question answer options timeAlloted maxMarks'
            });
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        res.status(200).json({ success: true, quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getUserIdByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user ? user._id : null;
};

const storeResponses = async (req, res) => {
    try {
        // console.log("requesting data: ", req.body)
        const { player: email, quiz, responses, finalScore } = req.body;
        console.log(email, quiz, responses, finalScore)
        console.log("email: ", email);
        const playerId = await getUserIdByEmail(email);
        
        if (!playerId) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const newResponse = new PlayerResponse({
            player: playerId,
            quiz,
            responses,
            finalScore
        });

        await newResponse.save();

        await Quiz.updateOne({ _id: quiz }, { $set: { isActive: 'Inactive' } });

        res.status(201).json({ message: 'Response saved successfully' });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ message: 'Failed to save response' });
    }
}

module.exports = {
    startQuiz,
    createNewQuiz,
    acceptJoinings,
    getQuizById,
    storeResponses
}