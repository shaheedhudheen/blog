const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const cookieParser = require("cookie-parser")
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

//!middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json()) //middleware to parse the request body as JSON
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(cookieParser()) //middleware for parsing cookies

//!connect to mongoDB
mongoose.connect(MONGO_URL)

//*allows the application or service to listen for incoming connections on any available port without having to specify a fixed port number in advance.

const PORT = process.env.PORT || 3000

const userRouter = require("./routes/userRoute")
app.use("/", userRouter)

const postRouter = require("./routes/postRoute")
app.use("/post", postRouter)

// ?start a web server and listen for incoming connections on a specified port
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})

// mongodb+srv://blog:wOhp5DaGVo28ZoBj@cluster0.1dqrt1c.mongodb.net/?retryWrites=true&w=majority
