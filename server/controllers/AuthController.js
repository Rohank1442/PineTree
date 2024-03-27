const jwt = require('jsonwebtoken')

auth = async (req, res, next) => {
    try{
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));
        const user = await decodedToken;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: new Error("Invalid Request"),
        })
    }
}