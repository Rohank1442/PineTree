const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const subTopicRoutes = require('./routes/subtopicRoutes');
const quizPlayerWait = require('./routes/quizPlayerWait');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const quizRoutes = require('./routes/quizRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
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
app.use('/quiz', quizRoutes); 
app.use('/api', questionRoutes);
app.use('/api', resultRoutes);
app.use('/leaderboard', leaderboardRoutes);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let onlineUsers = [];
let timers = {};
let gameStates = {};

const usp = io.of('/user-namespace');

const startTimer = (subtopicId) => {
    if (!timers[subtopicId]) {
        timers[subtopicId] = {
            timeLeft: 30,
            interval: setInterval(() => {
                if (timers[subtopicId]) {
                    timers[subtopicId].timeLeft -= 1;
                    if (timers[subtopicId].timeLeft <= 0) {
                        clearInterval(timers[subtopicId].interval);
                        delete timers[subtopicId];
                        gameStates[subtopicId] = 'ongoing';
                        usp.to(subtopicId).emit('timerUpdate', 0);
                        usp.to(subtopicId).emit('gameState', 'ongoing');
                    } else {
                        usp.to(subtopicId).emit('timerUpdate', timers[subtopicId].timeLeft);
                    }
                }
            }, 1000)
        };
    }
};

usp.on('connection', function (socket) {
    console.log('User connected:', socket.id);

    socket.on('userConnected', (user) => {
        console.log('Received user data:', user);
        if (user) {
            user.id = socket.id;
            socket.join(user.subtopicId);

            if (!gameStates[user.subtopicId]) {
                gameStates[user.subtopicId] = 'waiting';
            }

            // if (gameStates[user.subtopicId] === 'ongoing') {
            //     socket.emit('gameState', 'ongoing');
            //     console.log(`User ${user.email} cannot join: game already ongoing.`);
            //     return;
            // }

            onlineUsers.push(user);
            startTimer(user.subtopicId);

            const filteredUsers = onlineUsers.filter(onlineUsers => onlineUsers.subtopicId === user.subtopicId);
            usp.to(user.subtopicId).emit('updateUserList', filteredUsers);
            usp.to(user.subtopicId).emit('timerUpdate', timers[user.subtopicId].timeLeft);
            console.log(`User joined room: ${user.email}`);
        } else {
            console.error('Received null or undefined user data');
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        const disconnectedUser = onlineUsers.find(user => user.id === socket.id);
        onlineUsers = onlineUsers.filter(user => user.id !== socket.id);
        if (disconnectedUser) {
            socket.leave(disconnectedUser.subtopicId);
            const filteredUsers = onlineUsers.filter(onlineUser => onlineUser.subtopicId === disconnectedUser.subtopicId);
            usp.to(disconnectedUser.subtopicId).emit('updateUserList', filteredUsers);

            console.log("filteredUsersLength: ", filteredUsers.length);
            if (filteredUsers.length === 0 && timers[disconnectedUser.subtopicId]) {
                delete timers[disconnectedUser.subtopicId];
                delete gameStates[disconnectedUser.subtopicId];
            }
        }
    });
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wto2koe.mongodb.net/userSchema`)
    .then(() => {
        console.log("database connected successfully!");
        http.listen(5000, () => {
            console.log("started on port 5000");
        });
    })
    .catch((err) => {
        console.log(err);
    });