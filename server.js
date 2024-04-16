const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database/connect");

const register = require("./route/register.route");

require("dotenv").config();
connectDB(process.env.MONGODB_URL);
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/register", register);
