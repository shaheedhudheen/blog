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

    // extract user id from token (decoded by authMiddleware)
    const { _id } = req.user

    // Create a new post document
    const postDoc = await createPostDocument({
      title,
      summary,
      content,
      file: newPath,
      author: _id,
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
const editPost = async (req, res) => {
  try {
    // extract user id from token (decoded by authMiddleware)
    const { _id } = req.user

    //extract post id from request body
    const { id } = req.body

    //get post info from id got from req.body
    const postDoc = await Post.findById(id)

    //check if it's OG author is editing by comparing user id from token and author Id from Post Document

    const isAuthor = JSON.stringify(_id) === JSON.stringify(postDoc.author)

    //if it's not author send appropriate response
    if (!isAuthor) {
      return res.status(400).json("invalid author")
    }

    // Extract necessary information from the request
    const { originalname, path } = req.file
    const { title, summary, content } = req.body

    // Rename and move uploaded file
    const newPath = renameAndMoveFile(originalname, path)

    // Update the Post document
    await postDoc.updateOne({
      title,
      summary,
      content,
      file: newPath ? newPath : postDoc.file,
      author: _id,
    })

    // Respond with the created post document
    res.json(postDoc)
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const deletePost = async (req, res) => {
  try {
    // extract user id from token (decoded by authMiddleware)
    const { _id } = req.user
    //extract post id from request params
    const { id } = req.params

    //get post info from id got from req.body
    const postDoc = await Post.findById(id)

    //check if it's OG author is editing by comparing user id from token and author Id from Post Document

    const isAuthor = JSON.stringify(_id) === JSON.stringify(postDoc.author)

    //if it's not author send appropriate response
    if (!isAuthor) {
      return res.status(400).json("invalid author")
    }

    const deletedPost = await Post.findByIdAndDelete(id)

    res.send(deletedPost)
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
  deletePost,
}
