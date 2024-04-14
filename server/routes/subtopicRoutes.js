const express = require('express');
const router = express.Router();
const SubTopic = require('../models/SubTopic');

router.get('/', async (req, res) => {
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
        // pagination, search, sort
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
        
        // console.log("subTopics: ", subTopics)
        const total = await SubTopic.countDocuments({
            subTopicName: { $regex: search, $options: "i" },
        });
        // console.log("totalPages: ", totalPages)
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

router.get('/subTopics/:id', getSubTopicById, (req, res) => {
    res.json(res.subTopic);
});

async function getSubTopicById(req, res, next) {
    let subTopic;
    try {
        subTopic = await SubTopic.findById(req.params.id)
            .populate('creator', '-password')
        // .populate('subTopics');
        if (subTopic == null) {
            return res.status(404).json({ message: 'Cannot find topic' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subTopic = subTopic;
    next();
}
// const creatorId = '660c32a1eebdbec892b38961';

// const additionalTopicNames = [
//     'Manifolds and smooth structures',
//     'Homotopy theory',
//     'Fundamental groups and covering spaces',
//     'Knot theory',
//     'Algebraic topology',
//     'Hausdorff spaces',
//     'Compactness and local compactness',
//     'Separation axioms: T0, T1, T2, T3, T4 spaces'
// ];

// const newTopics = additionalTopicNames.map(subTopicName => ({
//     subTopicName,
//     creator: creatorId
// }));

// SubTopic.create(newTopics)
//     .then(savedTopics => {
//         console.log('New topics saved:', savedTopics);
//     })
//     .catch(err => {
//         console.error('Error saving new topics:', err);
//     });

module.exports = router;