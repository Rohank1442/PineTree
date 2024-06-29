const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    desc: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
        type: String,
    },
    subTopic: {
        type: String
    },
    isActive: {
        type: String,
        enum: ['Waiting', 'Joining', 'Active', 'Over'],
        default: "Waiting"
    },
    joiningId : {
        type: String,
        unique: true,
        required: true
    },
},{
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;