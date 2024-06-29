const express = require('express');
const router = express.Router();
const quizControls = require("../controllers/quizController");
const { authCheck, isLoggedIn } = require('../middleware');

router.route('/')
    .post(authCheck, isLoggedIn, quizControls.createNewQuiz);

router.route('/allowjoining')
    .post(authCheck, isLoggedIn, quizControls.acceptJoinings);

router.route('/generateleaderboard')
    .get(authCheck, isLoggedIn, quizControls.generateLeaderBoard);

router.route('/getleaderboard')
    .get(authCheck, isLoggedIn, quizControls.getLeaderBoard);

module.exports = router;