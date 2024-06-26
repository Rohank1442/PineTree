const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.getAllTopics);
router.get('/topics/:id', topicController.getTopicById);

module.exports = router;