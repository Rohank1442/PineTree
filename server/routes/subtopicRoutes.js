const express = require('express');
const router = express.Router();
const SubTopic = require('../models/SubTopic');

router.get('/', getSubTopicById, async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 6;
        const search = req.query.search || "";
        let sort = req.query.sort || "subTopicName";
        const { creator } = req.query;

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        
        if (creator) {
            req.query.creator = creator;
        }
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }
        const subTopics = await SubTopic.find({ subTopicName: { $regex: search, $options: "i" } })
        .populate('creator', '-password')
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)
        
        const total = await Topic.countDocuments({
            subTopicName: { $regex: search, $options: "i" },
        });
        console.log(limit)
        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            subTopics
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get('/subtopics/:id', getSubTopicById, (req, res) => {
    res.json(res.subTopic);
});

async function getSubTopicById(req, res, next) {
    console.log("------- subtopics -------")
    let subTopic;
    try {
        subTopic = await Topic.findById(req.params.id)
            .populate('creator', '-password')
            .populate('subTopics');
        if (subTopic == null) {
            return res.status(404).json({ message: 'Cannot find topic' });
        }
        console.log(subTopic)
        res.subTopic = subTopic;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;