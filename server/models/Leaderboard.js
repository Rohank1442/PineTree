const mongoose = require('mongoose');

const leaderBoardSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
        unique: true
    },
    players: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
            required: true
        }
    }]
},{
    timestamps: true
});

leaderBoardSchema.pre('save', function (next) {
    if (this.players && this.players.length > 1) {
        this.players.sort((p1, p2) => p2.finalScore - p1.finalScore);
    }
    next();
});

const LeaderBoard = mongoose.model('LeaderBoard', leaderBoardSchema);
module.exports = LeaderBoard;