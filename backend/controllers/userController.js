const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)
const secretKey = process.env.JWT_SECRET

const userProfile = (req, res) => {
  const { token } = req.cookies
  //verify token
  jwt.verify(token, secretKey, {}, (error, decoded) => {
    if (error) throw error
    res.json(decoded)
  })
}

// const userRegister = async (req, res) => {
//   //get username and password from request body
//   const { username, password } = req.body
//   try {
//     const userDocument = await User.create({
//       username,
//       password: bcrypt.hashSync(password, salt), //encrypting password before sending to DB
//     })
//     res.json(userDocument)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// }

//! Register User

const userRegister = async (req, res) => {
  //get username and password from request body
  const { username, password } = req.body
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user document in the database
    const userDocument = await User.create({
      username,
      password: hashedPassword,
    })

    // Send the user document to the client
    res.json({ userDocument })
  } catch (error) {
    // Handle any errors from the database or the token generation
    console.error(error)
    res.status(500).json(error)
  }
}

//! User Login

const userLogin = async (req, res) => {
  try {
    //get username and password from request body
    const { username, password } = req.body

    //find user document by username using findOne method
    const userDocument = await User.findOne({ username })

    //check if user exists
    if (!userDocument) {
      //use return statement to exit the function
      return res.status(404).json({ message: "User not found" })
    }

    //compare passwords using bcrypt.compare method
    const passVerify = await bcrypt.compare(password, userDocument.password)

    console.log(passVerify, username, password)

    //check if passwords match
    if (!passVerify) {
      //use return statement to exit the function
      return res.status(404).json({ message: "Wrong credentials" })
    }

    //sign token using jwt.sign method
    const token = await jwt.sign({ username, _id: userDocument._id }, secretKey)

    //send token as cookie and user info as response object
    res.cookie("token", token).json({
      _id: userDocument._id,
      username: userDocument.username,
    })
  } catch (error) {
    console.error(error)
    //send a json response object
    res.status(401).json({ message: "Login error" })
  }
}

const userLogout = (req, res) => {
  res.cookie("token", "").json("ok")
}

module.exports = {
  userProfile,
  userRegister,
  userLogin,
  userLogout,
}
