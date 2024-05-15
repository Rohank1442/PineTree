const express = require('express');
const router = express.Router();
const qpwController = require('../controllers/qpwController');

router.get('/topics/:id', qpwController.getsubtopicById)

module.exports = router;