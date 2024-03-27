const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    },
    levels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    }]
});

const SubTopic = mongoose.model('SubTopic', subTopicSchema);
module.exports = SubTopic;