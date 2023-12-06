const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//verify token

const verifyToken = async (req, res, next) => {
  try {
    //get token from cookie
    const { token } = req.cookies
    //check if token exists
    if (!token) {
      return res.status(401).json({ message: "Not authorized, Sign In" })
    }

    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    
    // user info from token using findById method
    //lean method to return a plain JS object instead of a mongoose document
    req.user = await User.findById(decoded._id).select("-password").lean()
    
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Not authorized" })
    throw new Error("Not authorized")
  }
}

module.exports = verifyToken
