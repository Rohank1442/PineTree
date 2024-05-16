const Subtopic = require('../models/SubTopic');

exports.getsubtopicById = async (req, res) => {
    try {
        console.log(req.params.id);
        const subtopic = await Subtopic.findById(req.params.id);
        // console.log("subtopic: ", subtopic);
        const response = {
            subtopic
        }
        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}