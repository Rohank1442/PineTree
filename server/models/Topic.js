const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        req: true
    },
    creator: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // subTopics: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'SubTopic'
    // }]
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;