const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController')

router.route('/result')
        .get(resultController.getResult)
        .post(resultController.storeResult)
        .delete(resultController.dropResult)

module.exports = router;