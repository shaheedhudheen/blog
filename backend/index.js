const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secretKey = "vihawee5tui2a2v6io62hafbbwr9pv0wp";

//!middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json()); //middleware to parse the request body as JSON
app.use(cookieParser()); //middleware for parsing cookies

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blog");

//?allows the application or service to listen for incoming connections on any available port without having to specify a fixed port number in advance.
const PORT = process.env.PORT || 3000;

// ?route handler for GET requests to a specific URLs
app.get("/test", (req, res) => {
  res.json({ message: "testing working" });
});

//checking if logged in
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  //verify token
  jwt.verify(token, secretKey, {}, (error, decoded) => {
    if (error) throw error;
    res.json(decoded);
  });
});

// ?route handler for POST requests to a specific URLs

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDocument = await User.create({
      username,
      password: bcrypt.hashSync(password, salt), //encrypting password before sending to DB
    });
    res.json(userDocument);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDocument = await User.findOne({ username });
  const passVerify = bcrypt.compareSync(password, userDocument.password); // compare passwords and returns boolean

  if (passVerify) {
    //logg in and genarate token (jwt)
    jwt.sign(
      { username, id: userDocument._id },
      secretKey,
      {},
      (error, token) => {
        if (error) throw error;
        res.cookie("token", token).json({
          id: userDocument._id,
          username: userDocument.username,
        }); //sent as a cookie everytime we do a request
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// ?start a web server and listen for incoming connections on a specified port
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

// mongodb+srv://blog:wOhp5DaGVo28ZoBj@cluster0.1dqrt1c.mongodb.net/?retryWrites=true&w=majority