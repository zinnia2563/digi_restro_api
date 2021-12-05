const express = require("express");
const router = express.Router();
const {
  createUser,
  authUser,
} = require("../controllers/userController");

//admin for create and get users
router.route("/register").post(createUser);
//Login routes for all users including admin
router.route("/login").post(authUser);

module.exports = router;