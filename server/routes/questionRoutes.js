const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController')

router.route('/questions')
        .get(questionController.getQuestions)
        .post(questionController.insertQuestions)
        .delete(questionController.dropQuestions)

module.exports = router;