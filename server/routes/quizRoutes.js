const express = require('express');
const router = express.Router();
const quizControls = require("../controllers/quizController");
const { authCheck, isLoggedIn } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.route('/')
    .post(authCheck, isLoggedIn, upload.single('image'), quizControls.createNewQuiz);

router.route('/allowjoining')
    .post(authCheck, isLoggedIn, quizControls.acceptJoinings);

router.route('/getQuizData/:subTopicId')
    .get(quizControls.getQuizById);

router.route('/getQuizJoinId/:joiningId')
    .get(quizControls.getQuizJoinId);

router.route('/storeResponse')
    .post(quizControls.storeResponses);

module.exports = router;