const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const topicRoutes = require('./routes/topicRoutes');
const subTopicRoutes = require('./routes/subtopicRoutes');
const quizPlayerWait = require('./routes/quizPlayerWait');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const morgan = require('morgan');

dotenv.config();

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/', authRoutes);
app.use('/', topicRoutes);
app.use('/', quizPlayerWait);
app.use('/api', questionRoutes);
app.use('/api', resultRoutes);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];

const usp = io.of('/user-namespace');

usp.on('connection', function (socket) {
    console.log('User connected:', socket.id);

    socket.on('userConnected', (user) => {
        console.log('Received user data:', user);
        if (user) {
          user.id = socket.id;
          onlineUsers.push(user);
          console.log("user-subtopicId: ", user.subtopicId)
          const filteredUsers = onlineUsers.filter(onlineUsers => onlineUsers.subtopicId === user.subtopicId);
          usp.emit('updateUserList', filteredUsers);
          console.log(`User joined room: ${user.email}`);
        } else {
          console.error('Received null or undefined user data');
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        onlineUsers = onlineUsers.filter(user => user.id !== socket.id);
        usp.emit('updateUserList', onlineUsers);
    });
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wto2koe.mongodb.net/userSchema`)
    .then(() => {
        console.log("database connected successfullly!");
        http.listen(5000, () => {
            console.log("started on port 5000")
        })
    })
    .catch((err) => {
        console.log(err);
    })