const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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
const MultiplayerLeaderBoard = require('./models/MultiplayerLeaderboard');
const User = require('./models/userSchema');

dotenv.config();

let onlineUsers = [];
let timers = {};

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('tiny'));
app.use('/uploads', express.static('uploads'));

app.use('/', authRoutes);
app.use('/', topicRoutes);
app.use('/', quizPlayerWait);
app.use('/quiz', quizRoutes);
app.use('/api', questionRoutes);
app.use('/api', resultRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.post('/multi/leaderboard', async (req, res) => {
    try {
        const { _id, quiz, subtopicId, player: playerEmail, responses, finalScore } = req.body;
        const user = await User.findOne({ email: playerEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const player = user._id;
        
        let leaderboardId = _id;
        if (!leaderboardId) {
            leaderboardId = timers[subtopicId].leaderBoardId;
        }

        console.log(leaderboardId);

        let leaderboard = await MultiplayerLeaderBoard.findById(leaderboardId);

        if (!leaderboard) {
            return res.status(404).json({ message: 'quiz not found!' });
        }

        const existingPlayerIndex = leaderboard.players.findIndex(p => p.player.toString() === player.toString());

        if (existingPlayerIndex !== -1) {
            leaderboard.players[existingPlayerIndex].responses = responses.map(response => ({
                question: response.question,
                answer: response.answer,
                score: response.score
            }));
            leaderboard.players[existingPlayerIndex].finalScore = finalScore;
        } else {
            leaderboard.players.push({
                player,
                responses: responses.map(response => ({
                    question: response.question,
                    answer: response.answer,
                    score: response.score
                })),
                finalScore
            });
        }

        await leaderboard.save();

        res.status(200).json({ message: 'Leaderboard updated successfully', data: {leaderboardId: leaderboardId} });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).json({ message: 'Failed to update leaderboard' });
    }
})

app.get("/multi/leaderboard/:leaderboardId", async (req, res) => {
    try {
        const { leaderboardId } = req.params;
        console.log("leaderBoardId:", leaderboardId)
        if (!leaderboardId) {
            return res.status(400).json({
                success: false,
                message: "Please Provide the quiz Id"
            })
        }
        const leaderboard = await MultiplayerLeaderBoard.findById(leaderboardId)
            .populate('players.player', 'username')
            .populate('players.responses.question', 'text');
            
        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
})

// Check
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});



const usp = io.of('/user-namespace');

const startTimer = async (subtopicId, numberOfQuestions) => {
    if (!(subtopicId in timers)) {
        timers[subtopicId] = {
            joinInterval: async () => {
                let timeLeft = 30;
                let hold = setInterval(async () => {
                    if (timers[subtopicId]) {
                        console.log(`joining timer${subtopicId}: `, timeLeft)
                        timeLeft -= 1;
                        if (timeLeft <= 0) {
                            let gameUsers = onlineUsers.filter((onlineUser) => onlineUser.subtopicId === subtopicId);
                            clearInterval(hold);

                            if (gameUsers.length === 0) {
                                await Quiz.updateOne({ subTopic: subtopicId }, { $set: { isActive: 'Inactive' } });
                                return;
                            }

                            usp.to(subtopicId).emit('joinTimerUpdate', 0);
                            usp.to(subtopicId).emit('gameState', 'ongoing');
                            await Quiz.updateOne({ subTopic: subtopicId }, { $set: { isActive: 'Ongoing' } });
                            timers[subtopicId].ongoingInterval();
                        } else {
                            usp.to(subtopicId).emit('joinTimerUpdate', timeLeft);
                        }

                    }
                }, 1000)

                timers[subtopicId].joinIntervalInstance = hold;
            },
            ongoingInterval: () => {
                let timeLeft = (numberOfQuestions  * 10) + 6;
                let hold = setInterval(async () => {
                    timeLeft -= 1;

                    console.log(`ongiong timer(${subtopicId}): `, timeLeft);
                    usp.to(subtopicId).emit('ongoingTimerUpdate', timeLeft);

                    if (timeLeft === 0) {
                        console.log(timeLeft);
                        clearInterval(hold);
                        usp.to(subtopicId).emit("quizFinished", timers[subtopicId].leaderBoardId);
                        await Quiz.updateOne({ subTopic: subtopicId }, { $set: { isActive: 'Inactive' } });
                    }
                }, 1000);
                timers[subtopicId].ongoingIntervalInstance = hold;
            }
        };
    }
};


usp.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinGame', async (gameData) => {
        console.log('Received data:', gameData);
        if (gameData) {
            const quiz = await Quiz.findOne({ subTopic: gameData.subtopicId });
            console.log(quiz.isActive);
            if (quiz && (quiz.isActive === 'Inactive' || quiz.isActive === "Joining")) {
                gameData.id = socket.id;
                socket.join(gameData.subtopicId)
                if (quiz.isActive === "Inactive") {
                    startTimer(gameData.subtopicId, quiz.questions ? quiz.questions.length: 0);
                    await timers[gameData.subtopicId].joinInterval();
                    const leaderboard = new MultiplayerLeaderBoard({ quiz: gameData.subtopicId, players: [] });
                    const createdLeaderboard = await leaderboard.save();
                    timers[gameData.subtopicId].leaderBoardId = createdLeaderboard._id;
                    await Quiz.updateOne({ subTopic: gameData.subtopicId }, { $set: { isActive: 'Joining' } });
                }
                
                onlineUsers.push(gameData);
                const filteredUsers = onlineUsers.filter(onlineUser => onlineUser.subtopicId === gameData.subtopicId);
                usp.to(gameData.subtopicId).emit('updateUserList', filteredUsers);
                usp.to(gameData.subtopicId).emit('gameState', 'Joining');
                console.log(`User joined ro om: ${gameData.email}`);
            } else {
                socket.emit('gameAlreadyStarted');
                console.log(`User ${gameData.email} cannot join: game already ongoing.`);
            }
        } else {
            console.error('Received null or undefined user data');
        }
    });

    socket.on("leaveGame", async (gameData) => {
        console.log('User leaving game', gameData);
        const disconnectedUser = onlineUsers.find(user => user.id === socket.id && user.subtopicId === gameData.subtopicId);
        onlineUsers = onlineUsers.filter(user => !(user.id === socket.id));
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
    })

    socket.on('disconnect', async () => {
        console.log('User Disconnected', socket.id);
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