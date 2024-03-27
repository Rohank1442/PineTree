const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;