const mongoose = require('mongoose');

const multiplayerLeaderBoardSchema = new mongoose.Schema({
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
        responses: [{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            answer: {
                type: String
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

multiplayerLeaderBoardSchema.pre('save', function (next) {
    if (this.players && this.players.length > 1) {
        this.players.sort((p1, p2) => p2.finalScore - p1.finalScore);
    }
    next();
});

const MultiplayerLeaderBoard = mongoose.model('MultiplayerLeaderBoard', multiplayerLeaderBoardSchema);
module.exports = MultiplayerLeaderBoard;