const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authCheck = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token not found."
        })
    }
    req.token = token;
    next();
}

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userToLogin = await User.findById(decoded.userId);
        if (!userToLogin) {
            return res.status(400).json({ success: false, message: "No User found with this user Id" });
        }
        req.user = userToLogin;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(400).json({ success: false, message: "Token Expired" });
        } else if (error.name === "JsonWebTokenError") {
            res.status(400).json({ success: false, message: "Invalid JWT token" });
        } else {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = { authCheck, isLoggedIn }
