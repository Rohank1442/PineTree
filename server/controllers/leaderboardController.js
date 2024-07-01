const LeaderBoard = require('../models/Leaderboard');

const getLeaderboard = async (req, res) => {
    try {
        const { quizId } = req.params;
        console.log("QuizId:", quizId)
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Please Provide the quiz Id"
            })
        }
        const leaderboard = await LeaderBoard.findOne({ quiz: quizId })
            .populate('players.player', 'name')
            .populate('players.responses');

        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
};

const updateLeaderboard = async (req, res) => {
    try {
        const { quiz, player, responses, finalScore } = req.body;

        let leaderboard = await LeaderBoard.findOne({ quiz });

        if (!leaderboard) {
            leaderboard = new LeaderBoard({ quiz, players: [] });
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

        res.status(200).json({ message: 'Leaderboard updated successfully' });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).json({ message: 'Failed to update leaderboard' });
    }
};

module.exports = {
    getLeaderboard,
    updateLeaderboard
};