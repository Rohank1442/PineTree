const mongoose = require('mongoose');

const playerTempResponseSchema = new mongoose.Schema({
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
            type: Number
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const PlayerTempResponse = mongoose.model('PlayerTempResponse', playerTempResponseSchema);
module.exports = PlayerTempResponse;