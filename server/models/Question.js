const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionModel = new Schema({
    question: { 
        type: String,
        required: true
    },
    answer: { 
        type: String ,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    timeAlloted: {
        type: Number,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
},{
    timestamps: true
});

const Question = mongoose.model('Question', questionModel);
module.exports = Question