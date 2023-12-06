const fs = require("fs")
const Post = require("../models/postModel")
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET

// Function to rename and move the uploaded file
const renameAndMoveFile = (originalname, path) => {
  const parts = originalname.split(".")
  const extension = parts[parts.length - 1]
  const newPath = path + "." + extension
  fs.renameSync(path, newPath)
  return newPath
}

// Function to verify user token
const verifyUserToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    // If the token is invalid, throw an error
    throw new Error("Invalid token")
  }
}

// Function to create a post document
const createPostDocument = async (postData) => {
  return await Post.create(postData)
}

//! View Blog Posts on Home Page
const home = async (req, res) => {
  const posts = await Post.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(20)
  res.json(posts)
}

//! Single Post Page
const singlePost = async (req, res) => {
  const { id } = req.params
  const postInfo = await Post.findById(id).populate("author", ["username"])
  res.json(postInfo)
}

//! Create Post Page
const createPost = async (req, res) => {
  try {
    // Extract necessary information from the request
    const { originalname, path } = req.file
    const { title, summary, content } = req.body

    // Rename and move uploaded file
    const newPath = renameAndMoveFile(originalname, path)

    // Verify user token
    const decoded = verifyUserToken(req.cookies.token)

    // Create a new post document
    const postDoc = await createPostDocument({
      title,
      summary,
      content,
      file: newPath,
      author: decoded._id,
    })

    // Respond with the created post document
    res.json(postDoc)
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

//! Edit Post Page
const editPost = (req, res) => {
  try {
    // extract id from token (decoded by authMiddleware)
    const { _id } = req.user

    console.log(req.body)

    // Extract necessary information from the request
    const { originalname, path } = req.file
    const { title, summary, content } = req.body

    // Rename and move uploaded file
    const newPath = renameAndMoveFile(originalname, path)
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {
  home,
  singlePost,
  createPost,
  editPost,
}
