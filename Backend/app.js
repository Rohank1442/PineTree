const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userSchema')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)    
        const usersModel = await userModel.findOne({ email: email });
        if (usersModel) {
            console.log(usersModel.password)
            if (password === usersModel.password) {
                res.send({ message: "login succesfull", usersModel: usersModel })
                console.log("login successfull")
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
    const { name, email, password, cnfrmPass } = req.body;
    console.log(name, email, password, cnfrmPass);
    if (password !== cnfrmPass) {
        console.log("Password does not match")
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    try {
        console.log(email)
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser)
        // Existing user
        if (existingUser) {
            console.log("Existing User")
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log("User created succesfully")

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log("Internal Server Error")
        // console.error('Error:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
    userModel.create(req.body)
        .then(ser => res.json(ser))
        .catch(err => res.json(err))
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