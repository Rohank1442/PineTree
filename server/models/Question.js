const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionModel = new Schema({
    questions: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    },
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Question = mongoose.model('Question', questionModel);
module.exports = Question