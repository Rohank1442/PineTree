const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    },
    subTopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTopic'
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    timer: {
        type: Number,
        default: 30
    },
    isActive: {
        type: Boolean,
        default: false
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    leaderBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaderBoard'
    },
    playerTempResponses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerTempResponse'
    }],
    quizPlayers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'QuizPlayerWait' 
    }],
    joinTimeLimit: { 
        type: Number, 
        default: 30 
    },
    joinStartTime: { 
        type: Date 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;