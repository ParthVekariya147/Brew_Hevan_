


const jwt = require("jsonwebtoken");
const User = require('../model/UserSchema');

exports.check_token = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Authentication token is missing" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
