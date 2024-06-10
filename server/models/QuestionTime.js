const mongoose = require('mongoose');

const questionTimeSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
    },
    timeTaken: {
        type: Number,
        required: true,
    },
});

const QuestionTime = mongoose.model('QuestionTime', questionTimeSchema);

module.exports = QuestionTime;