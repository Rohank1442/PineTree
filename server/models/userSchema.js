const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    role: {
        type: String,
        enum: ['admin', 'creator', 'user'], default: 'user'
    },
    points: {
        type: Number,
        default: 0
    },
    createdQuizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = new mongoose.model('User', userSchema)
module.exports = User