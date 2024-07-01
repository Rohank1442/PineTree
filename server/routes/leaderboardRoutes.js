const express = require('express');
const router = express.Router();
const leaderboardControls = require('../controllers/leaderboardController');

router.route('/:quizId')
    .get(leaderboardControls.getLeaderboard);
router.route('/')
    .post(leaderboardControls.updateLeaderboard);

module.exports = router;