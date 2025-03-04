const accessControl = (req, res, next) => {
  if (process.env.STAFF_API_ACCESS === "false") {
    return res
      .status(403)
      .json({ message: "Access to staff API is forbidden." });
  }
  next();
};

module.exports = accessControl;
