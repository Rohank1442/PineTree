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
const Quiz = require('./models/Quiz')
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

const usp = io.of('/user-namespace');

const startTimer = async (subtopicId) => {
    if (!(subtopicId in timers)) {
        timers[subtopicId] = {
            joinInterval: () => {
                let timeLeft = 30;
                let hold = setInterval(async () => {
                    if (timers[subtopicId]) {
                        console.log(`joining timer${subtopicId}: `, timeLeft)
                        timeLeft -= 1;
                        if (timeLeft <= 0) {
                            clearInterval(hold);
                            usp.to(subtopicId).emit('timerUpdate', 0);
                            usp.to(subtopicId).emit('gameState', 'ongoing');
                            await Quiz.updateOne({ subTopic: subtopicId }, { $set: { isActive: 'Ongoing' } });
                            timers[subtopicId].ongoingInterval();
                        } else {
                            usp.to(subtopicId).emit('timerUpdate', timeLeft);
                        }
                    }
                }, 1000)
                timers[subtopicId].joinIntervalInstance = hold;
            },
            ongoingInterval: () => {
                let timeLeft = 180;
                let hold = setInterval(async () => {
                    timeLeft -= 1;
                    
                    console.log(`ongiong timer(${subtopicId}): `, timeLeft);
                }, 1000);
                timers[subtopicId].ongoingIntervalInstance = hold;
            }
        };
    }
};


usp.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('userConnected', async (user) => {
        console.log('Received user data:', user);
        if (user) {
            const quiz = await Quiz.findOne({ subTopic: user.subtopicId });
            console.log(quiz.isActive);
            if (quiz && (quiz.isActive === 'Inactive' || quiz.isActive === "Joining")) {
                user.id = socket.id;
                socket.join(user.subtopicId)
                if (quiz.isActive === "Inactive") {
                    startTimer(user.subtopicId);
                    await timers[user.subtopicId].joinInterval();
                    await Quiz.updateOne({ subTopic: user.subtopicId }, { $set: { isActive: 'Joining' } });
                }
    
                onlineUsers.push(user);
                const filteredUsers = onlineUsers.filter(onlineUser => onlineUser.subtopicId === user.subtopicId);
                usp.to(user.subtopicId).emit('updateUserList', filteredUsers);
                console.log(`User joined room: ${user.email}`);
            } else {
                socket.emit('gameState', 'ongoing');
                console.log(`User ${user.email} cannot join: game already ongoing.`);
            }
        } else {
            console.error('Received null or undefined user data');
        }
    });

    socket.on('disconnect', async () => {
        console.log('User Disconnected');
        const disconnectedUser = onlineUsers.find(user => user.id === socket.id);
        onlineUsers = onlineUsers.filter(user => user.id !== socket.id);
        if (disconnectedUser) {
            socket.leave(disconnectedUser.subtopicId);
            const filteredUsers = onlineUsers.filter(onlineUser => onlineUser.subtopicId === disconnectedUser.subtopicId);
            usp.to(disconnectedUser.subtopicId).emit('updateUserList', filteredUsers);

            const quiz = await Quiz.findOne({ subTopic: disconnectedUser.subtopicId });
            console.log("filteredUsersLength: ", filteredUsers.length);
            if (filteredUsers.length === 0 && quiz.isActive === "Ongoing") {
                timers[disconnectedUser.subtopicId].ongoingIntervalInstance && clearInterval(timers[disconnectedUser.subtopicId].ongoingIntervalInstance);
                await Quiz.updateOne({ subTopic: disconnectedUser.subtopicId }, { $set: { isActive: 'Inactive' } });
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