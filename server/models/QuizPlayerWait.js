const mongoose = require('mongoose');

const quizPlayerWaitSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mode: {
        type: String,
        enum: ['individual', 'multiplayer'],
        required: true,
    },
    status: {
        type: String,
        enum: ['waiting', 'joined', 'missed'],
        default: 'waiting'
    },
    joinedAt: {
        type: Date
    },
    readyForQuiz: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const QuizPlayerWait = mongoose.model('QuizPlayerWait', quizPlayerWaitSchema);
module.exports = QuizPlayerWait