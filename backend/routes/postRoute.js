const {
  home,
  singlePost,
  createPost,
  editPost,
} = require("../controllers/postController")
const express = require("express")
const multer = require("multer")
const router = express.Router()
const upload = multer({ dest: "uploads/" })
const authMiddleware = require("../middlewares/authMiddleware")

//*show posts to homepage
router.get("/", home)

//*show Single post page
router.get("/:id", singlePost)

//create a post
router.post("/", upload.single("file"), createPost)

//edit a post
router.put("/",authMiddleware, upload.single("file"), editPost)

module.exports = router
