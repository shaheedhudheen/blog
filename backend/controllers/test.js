// const { check, validationResult } = require("express-validator")
// const jwt = require("jsonwebtoken")

// // Define a validation middleware for the user input
// const validateUserInput = [
//   check("username")
//     .isLength({ min: 3 })
//     .withMessage("Username must be at least 3 characters long")
//     .trim()
//     .escape(),
//   check("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long")
//     .matches(/\d/)
//     .withMessage("Password must contain a number"),
// ]

// const userRegister = async (req, res) => {
//   // Check for validation errors
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   const { username, password } = req.body
//   try {
//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, salt)
//     // Create a new user document in the database
//     const userDocument = await User.create({
//       username,
//       password: hashedPassword,
//     })
//     // Generate a token using jsonwebtoken
//     const token = jwt.sign({ id: userDocument._id }, secret, {
//       expiresIn: "1h",
//     })
//     // Send the token and the user document to the client
//     res.json({ token, userDocument })
//   } catch (error) {
//     // Handle any errors from the database or the token generation
//     res.status(500).json(error)
//   }
// }

// const createPost = async (req, res) => {
//   try {
//     // Extract necessary information from the request
//     const { originalname, path } = req.file
//     const { title, summary, content } = req.body

//     // Rename and move uploaded file
//     const newPath = renameAndMoveFile(originalname, path)

//     // Verify user token
//     const decoded = verifyUserToken(req.cookies.token)

//     // Create a new post document
//     const postDoc = await createPostDocument({
//       title,
//       summary,
//       content,
//       file: newPath,
//       author: decoded.id,
//     })

//     // Respond with the created post document
//     res.json(postDoc)
//   } catch (error) {
//     // Handle errors gracefully and send an appropriate response
//     console.error(error)
//     res.status(500).json({ error: "Internal Server Error" })
//   }
// }

// // Function to rename and move the uploaded file
// const renameAndMoveFile = (originalname, path) => {
//   const parts = originalname.split(".")
//   const extension = parts[parts.length - 1]
//   const newPath = path + "." + extension
//   fs.renameSync(path, newPath)
//   return newPath
// }

// // Function to verify user token
// const verifyUserToken = (token) => {
//   try {
//     return jwt.verify(token, secretKey)
//   } catch (error) {
//     // If the token is invalid, throw an error
//     throw new Error("Invalid token")
//   }
// }

// // Function to create a post document
// const createPostDocument = async (postData) => {
//   return await Post.create(postData)
// }

// // ! OG code

// const createPost1 = async (req, res) => {
//   // Extract necessary information from the request
//   //! rename files to its og name(photos)
//   const { originalname, path } = req.file
//   const parts = originalname.split(".")
//   const extension = parts[parts.length - 1]
//   const newPath = path + "." + extension
//   fs.renameSync(path, newPath)

//   const { token } = req.cookies

//   console.log(token)

//   jwt.verify(token, secretKey, {}, async (error, decoded) => {
//     if (error) throw error

//     const { title, summary, content } = req.body
//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       file: newPath,
//       author: decoded.id,
//     })
//     res.json(postDoc)
//   })
// }

// // code from another project

// const createPost2 = async (req, res) => {
//   const { category, title, description, price, location } = req.body
//   const { path } = req.file
//   const user = req.user
//   try {
//     const postDoc = await Post.create({
//       userId: user._id,
//       image: path,
//       title,
//       category,
//       description,
//       price,
//       location,
//     })

//     res.json(postDoc)
//   } catch (error) {
//     res.status(400)
//     console.log(error)
//   }
// }

// // edit posst

// const editPost = (req, res) => {
//   let newPath = null
//   if (req.file) {
//     const { originalname, path } = req.file
//     const parts = originalname.split(".")
//     const extension = parts[parts.length - 1]
//     newPath = path + "." + extension
//     fs.renameSync(path, newPath)
//   }

//   const { token } = req.cookies

//   jwt.verify(token, secretKey, {}, async (error, decoded) => {
//     if (error) throw error

//     const { id, title, summary, content } = req.body
//     const postDoc = await Post.findById(id)
//     const isAuthor =
//       JSON.stringify(postDoc.author) === JSON.stringify(decoded.id)
//     if (!isAuthor) {
//       return res.status(400).json("invalid author")
//     }
//     await postDoc.updateOne({
//       title,
//       summary,
//       content,
//       file: newPath ? newPath : postDoc.file,
//       author: decoded.id,
//     })
//     res.json(postDoc)
//   })
// }

const editPost = (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const extension = parts[parts.length - 1]
    newPath = path + "." + extension
    fs.renameSync(path, newPath)
  }
  const { token } = req.cookies
  jwt.verify(token, secretKey, {}, async (error, decoded) => {
    if (error) throw error
    const { id, title, summary, content } = req.body
    const postDoc = await Post.findById(id)
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(decoded.id)
    if (!isAuthor) {
      return res.status(400).json("invalid author")
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      file: newPath ? newPath : postDoc.file,
      author: decoded.id,
    })
    res.json(postDoc)
  })
}
