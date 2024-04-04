const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const topicRoutes = require('./routes/topicRoutes')

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', authRoutes);
app.use('/', topicRoutes);  

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
