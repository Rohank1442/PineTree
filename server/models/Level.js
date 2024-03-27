const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    minPoints: {
        type: Number,
        required: true
    },
    maxPoints: {
        type: Number,
        required: true
    },
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
});

const Level = mongoose.model('Level', levelSchema);
module.exports = Level;