const mongoose = require('mongoose');

const subTopicSchema = new mongoose.Schema({
    subTopicName: {
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
    }
});

const SubTopic = mongoose.model('SubTopic', subTopicSchema);
module.exports = SubTopic;