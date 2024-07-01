const mongoose = require('mongoose');

const playerResponseSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    responses: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    }],
    finalScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const PlayerResponse = mongoose.model('PlayerResponse', playerResponseSchema);
module.exports = PlayerResponse;