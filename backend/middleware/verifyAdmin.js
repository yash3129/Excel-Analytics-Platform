const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No or invalid token" });

    const token = authHeader.split(" ")[1];
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
    } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyAdmin;