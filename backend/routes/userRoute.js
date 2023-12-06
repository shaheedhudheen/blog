const express = require("express")
const router = express.Router()

const {
  userProfile,
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/userController")

const authMiddleware = require("../middlewares/authMiddleware")

// `app.METHOD(PATH, RouteHANDLER)`
//! GET Routes

// checking if logged in
router.get("/profile", userProfile)

// !POST Routes

router.post("/register", userRegister)

//login and genarate token

router.post("/login", userLogin)

//log out and remove the token

router.post("/logout", userLogout)

module.exports = router
