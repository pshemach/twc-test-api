const jwt = require("jsonwebtoken");
const User = require("../database/models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const token = req.header("Authentication")?.replace("Bearer", "");

  if (!token) {
    console.log(token);
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    console.log("User found: ", user);
    next();
  } catch (error) {
    res.status(403).json({ message: "You have to logged into the system" });
  }
};

module.exports = { authenticate };
