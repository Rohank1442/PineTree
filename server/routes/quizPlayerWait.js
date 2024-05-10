const express = require('express');
const router = express.Router();
const topicController = require('../controllers/qpwController');

router.get('/topics/:id', topicController.getTopicById);

module.exports = router;