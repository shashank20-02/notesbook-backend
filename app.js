const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const error = require("./middlewares/error");
dotenv.config({ path: "./config/Config.env" });

const App = express();
App.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
App.use(express.json());
App.use(cookieParser());
const User = require("./routes/UserRoutes");
const Note = require("./routes/NoteRoutes");
App.get("/", (req, res) => {
  res.status(200).send("working properly");
});
App.use("/v1/user", User);
App.use("/v1/note", Note);
App.use(error);
module.exports = App;
