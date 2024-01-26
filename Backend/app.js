const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const userModel = require('./models/userSchema')
const auth = require('./controllers/AuthController')
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv')

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userModel.findOne({ email: email });
        if (user) {
            // console.log(user.password)
            const auth = await bcrypt.compare(password, user.password)
            if (!auth) {
                return res.json({ message: 'Invalid Password' })
            }
            else {
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userEmail: user.email,
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
                res.status(200).send({
                    message: "Login Successful",
                    email: user.email,
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
    // console.log(req.body)
    const { username, email, password, cnfrmPass } = req.body;
    // console.log(cnfrmPass)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password does not meet the criteria' });
    }
    try {
        console.log(email)
        console.log(req.body);
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser)
        // Existing user
        console.log("here 1")
        if (existingUser) {
            console.log("Existing User")
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create a new user
        const newUser = new userModel({ username, email, password });
        console.log("User created succesfully")
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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