const express = require("express");
const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    let errorMessage;

    if (err.code === 11000) {
      errorMessage = "Email already exists";
    } else if (err.name === "ValidationError") {
      errorMessage = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    } else {
      errorMessage = err.message;
    }

    res.status(500).json({
      status: "failed",
      message: errorMessage,
    });
  }
});

module.exports = router;
