const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const userModel = require('./models/userSchema')
const bcrypt = require("bcryptjs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        console.log(email, password)
        const usersModel = await userModel.findOne({ email: email });
        if (usersModel) {
            // console.log(usersModel.password)
            const auth = await bcrypt.compare(password, usersModel.password)
            token = await usersModel.generateAuthToken();
            console.log(token)
            if (!auth) {
                return res.json({ message: 'Incorrect password or email' })
            }
            else {
                res.send({ message: "wrong credentials" })
                console.log("login unsuccesfull")
            }
        }
        else {
            res.send("not register")
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

mongoose.connect("mongodb+srv://Rohan:Wkk9AXaXYpfgkvxH@cluster0.wto2koe.mongodb.net/userSchema")
    .then(() => {
        console.log("database connected successfullly!");
        app.listen(5000, () => {
            console.log("started on port 5000")
        })
    })
    .catch((err) => {
        console.log(err);
    })