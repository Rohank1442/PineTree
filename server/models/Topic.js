const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        req: true
    },
    creator: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTopics: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubTopic'
        }],
        default: []
    }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;