const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const UserOTPVerification = require('../models/UserOTPVerification')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        User: String(process.env.AUTH_EMAIL),
        pass: String(process.env.AUTH_PASS),
    },
})

const sendOTPVerificationEmail = async (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: newUser.email,
                subject: "Verify your Email",
                html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete </p>
                <p>This code <b>expires in 1 hour</b>.</p>`,
            };

            const saltRounds = 10;
            const hashedOTP = await bcrypt.hash(otp, saltRounds);
            const newOTPVerification = new UserOTPVerification({
                userId: newUser._id,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            });

            await newOTPVerification.save();
            await transporter.sendMail(mailOptions);

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { sendOTPVerificationEmail };