const mongoose = require('mongoose');

const leaderBoardSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    players: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const LeaderBoard = mongoose.model('LeaderBoard', leaderBoardSchema);
module.exports = LeaderBoard;