const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
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

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        const topics = await Topic.find({ topicName: { $regex: search, $options: "i" } })
            .populate('creator', '-password')
            .populate({ path: 'subTopics' })
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Topic.countDocuments({ topicName: { $regex: search, $options: "i" } });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            topics
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.getTopicById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 6;
        const search = req.query.search || "";
        let sort = req.query.sort || "subTopics";
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

        // console.log(req.params.id)
        const topic = await Topic.findById(req.params.id)
            .populate('creator', '-password')
            .populate('subTopics');
        
        // console.log("topic->", topic);

        if (topic == null) {
            return res.status(404).json({ message: 'Cannot find topic' });
        }

        const sortedSubTopics = topic.subTopics.filter(st => st.subTopicName.match(new RegExp(search, 'i')))
            .sort((a, b) => {
                if (sort[1] === 'desc') {
                    return b.subTopicName.localeCompare(a.subTopicName);
                } else {
                    return a.subTopicName.localeCompare(b.subTopicName);
                }
            });

        const paginatedSubTopics = sortedSubTopics.slice(page * limit, page * limit + limit);

        const response = {
            error: false,
            total: sortedSubTopics.length,
            page: page + 1,
            limit,
            subTopics: paginatedSubTopics,
            topic
        };

        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};