const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 6;
        const search = req.query.search || "";
        let sort = req.query.sort || "topicName";
        const { creator } = req.query;

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        
        if (creator) {
            req.query.creator = creator;
        }
        // pagination, search, sort
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        const topics = await Topic.find({ topicName: { $regex: search, $options: "i" } })
        .populate('creator', '-password')
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)
        
        // console.log("topics: ", topics)
        const total = await Topic.countDocuments({
            topicName: { $regex: search, $options: "i" },
        });
        // const totalPages = Math.ceil(total / limit);
        // console.log("totalPages: ", totalPages)
        // console.log(limit)
        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            topics
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.get('/topics/:id', getTopicById, (req, res) => {
    res.json(res.topic);
});

async function getTopicById(req, res, next) {
    let topic;
    try {
        topic = await Topic.findById(req.params.id)
            .populate('creator', '-password')
        // .populate('subTopics');
        if (topic == null) {
            return res.status(404).json({ message: 'Cannot find topic' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.topic = topic;
    next();
}

const creatorId = '660c32a1eebdbec892b38961';

// const additionalTopicNames = [
//     'Numerical Analysis',
//     'Complex Analysis',
//     'Combinatorics',
//     'Graph Theory',
//     'Discrete Mathematics',
//     'Abstract Algebra',
//     'Real Analysis',
//     'Topology',
//     'Partial Differential Equations',
//     'Fourier Analysis',
//     'Number Systems',
//     'Logic',
//     'Game Theory',
//     'Optimization',
//     'Cryptography',
//     'Mathematical Modeling',
//     'Dynamical Systems',
//     'Measure Theory',
//     'Functional Analysis',
//     'Fractal Geometry'
// ];

// const newTopics = additionalTopicNames.map(topicName => ({
//     topicName,
//     creator: creatorId
// }));

// Topic.create(newTopics)
//     .then(savedTopics => {
//         // console.log('New topics saved:', savedTopics);
//     })
//     .catch(err => {
//         console.error('Error saving new topics:', err);
//     });

module.exports = router;