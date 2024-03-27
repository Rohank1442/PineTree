const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    username: {
        type: String,
        req: true
    },
    desc: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTopics: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubTopic'
    }]
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;