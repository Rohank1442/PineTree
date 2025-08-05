const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const userModel = require('../models/userSchema');
const { sendOTPVerificationEmail } = require('../utils/email');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await userModel.findOne({ email: email })
        if (User) {
            const auth = await bcrypt.compare(password, User.password)
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
                // res.cookie('JWT_HTTPONLY_Cookie', token, {
                //     httpOnly: true,
                //     sameSite: "none",
                //     secure: true,
                //     maxAge: 24 * 60 * 60 * 1000 
                // })
                res.status(200).json({
                    message: "Login Successful",
                    email: User.email,
                    Id: User._id,
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
}

exports.signup = async (req, res) => {
    const { username, email, password, cnfrmPass } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password does not meet the criteria' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            console.log("Existing User")
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new userModel({ username, email, password });
        await newUser.save();

        console.log("User created succesfully")

        // await sendOTPVerificationEmail(newUser, res)

        return res.status(201).json({ message: 'User created successfully and OTP sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.verifyOTP = async (req, res) => {
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
}

exports.resendOTPVerificationCode = async (req, res) => {
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
}

auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));
        const user = await decodedToken;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: new Error("Invalid Request"),
        })
    }
}

exports.checkUser = async (req, res) => {
    // console.log("check user");
    try {
        const {token} = req.body;
        jwt.verify(
            token,
            String(process.env.JWT_SECRET_KEY),
            (err, _) => {
                if (err) return res.status(401).json({message: "please login again"}); //invalid token
                return res.status(200).json({message: "authorised!"});
            }
        )
    } catch (err) {
        res.status(401).json({
            message: "Not Authorised!"
        })
    }
}

exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, sub: googleId, name } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            // Auto-create user
            user = new userModel({ email, username: name, password: googleId });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { userId: user._id, userEmail: user.email },
            String(process.env.JWT_SECRET_KEY),
            { expiresIn: "3h" }
        );

        return res.status(200).json({
            email: user.email,
            Id: user._id,
            token: jwtToken
        });

    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};