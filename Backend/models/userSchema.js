const mongoose = require('mongoose')
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
    this.password = await bcrypt.hash(this.password, 12);
});

const userModel = new mongoose.model("user", userSchema)
module.exports = userModel