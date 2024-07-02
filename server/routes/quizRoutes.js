const express = require('express');
const router = express.Router();
const quizControls = require("../controllers/quizController");
const { authCheck, isLoggedIn } = require('../middleware');

router.route('/')
    .post(authCheck, isLoggedIn, quizControls.createNewQuiz);

router.route('/allowjoining')
    .post(authCheck, isLoggedIn, quizControls.acceptJoinings);

router.route('/getQuizData/:subTopicId')
    .get(quizControls.getQuizById);

router.route('/storeResponse')
    .post(quizControls.storeResponses);

module.exports = router;