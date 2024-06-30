const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    subTopic: {
        type: Schema.Types.ObjectId,
        ref: 'SubTopic',
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    joiningId: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: String,
        default: 'Inactive'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);