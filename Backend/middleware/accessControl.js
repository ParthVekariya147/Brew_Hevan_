const accessControl = (req, res, next) => {
    // Check if staff API access is allowed
    if (process.env.STAFF_API_ACCESS === 'false') {
        return res.status(403).json({ message: 'Access to staff API is forbidden.' });
    }
    next();
};

module.exports = accessControl; 