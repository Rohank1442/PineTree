const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resendOTPVerificationCode', authController.resendOTPVerificationCode);

module.exports = router;