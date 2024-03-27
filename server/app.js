const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const userModel = require('./models/userSchema')
const auth = require('./controllers/AuthController')
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const UserOTPVerification = require('./models/UserOTPVerification');
const router = express.Router();

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        User: String(process.env.AUTH_EMAIL),
        pass: String(process.env.AUTH_PASS),
    },
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const User = await userModel.findOne({ email: email })
        console.log(User.email)
        if (User) {
            console.log(User.password)
            const auth = await bcrypt.compare(password, User.password)
            console.log(auth);
            if (!auth) {
                return res.status(404).json({ message: 'Invalid Password' })
            }
            else {
                const token = jwt.sign(
                    {
                        userId: User._id,
                        userEmail: User.email,
                    },
                    String(process.env.JWT_SECRET_KEY),
                    { expiresIn: "3h" }
                )
                res.cookie('JWT_HTTPONLY_Cookie', token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.status(200).json({
                    message: "Login Successful",
                    email: User.email,
                    token,
                })
            }
        }
        else {
            res.send("Invalid Email")
            console.log("User is not registered")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/signup", async (req, res) => {
    const { username, email, password, cnfrmPass } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password does not meet the criteria' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        // Existing user
        if (existingUser) {
            console.log("Existing User")
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new userModel({ username, email, password });
        await newUser.save();

        console.log("User created succesfully")

        await sendOTPVerificationEmail(newUser, res)

        return res.status(201).json({ message: 'User created successfully and OTP sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
            // res.json({
            //     status: "PENDING",
            //     message: "Verification otp email sent",
            //     data: {
            //         userId: _id,
            //         email: newUser.email,
            //     }
            // })
        } catch (error) {
            reject(error);
            // res.json({
            //     status: "FAILED",
            //     message: error.message,
            // })
        }
    })
}

router.post('/verifyOTP', async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed")
        } else {
            const UserOTPVeificationRecords = await UserOTPVerification.find({
                userId,
            })
            if (UserOTPVeificationRecords.length <= 0) {
                throw new Error(
                    "Account record doesn't exist or has been verified already. Please sign up"
                )
            } else {
                const { expiresAt } = UserOTPVeificationRecords[0];
                const hashedOTP = UserOTPVerification[0].otp;
                if (expiresAt < Date.now()) {
                    await UserOTPVeification.deleteMany({ userId });
                    throw new Error("Code has expired. Please request again.")
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP)
                    if (!validOTP) {
                        throw new Error("Invalid code passed. Check your inbox.")
                    } else {
                        await User.updateOne({ _id: userId }, { verified: true })
                        await UserOTPVeification.deleteMany({ userId })
                        res.json({
                            status: "VERIFIED",
                            message: 'User email verified successfully.',
                        })
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: 'error message',
        })
    }
})

router.post('/resendOTPVerificationCode', async (req, res) => {
    try {
        let { userId, email } = req.body;
        if (!userId || !email) {
            throw Error("Empty user details are not allowed");
        } else {
            await UserOTPVerification.deleteMany({ userId });
            sendOTPVerificationEmail({ _id: userId, email }, res)
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wto2koe.mongodb.net/userSchema`)
    .then(() => {
        console.log("database connected successfullly!");
        app.listen(5000, () => {
            console.log("started on port 5000")
        })
    })
    .catch((err) => {
        console.log(err);
    })