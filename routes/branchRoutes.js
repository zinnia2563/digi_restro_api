const express = require("express");
const router = express.Router();
const {
  branchCreate
} = require("../controllers/branchController");

router.route("/register").post(ownerRegistration);
router.route("/login").post(ownerLogin);

module.exports = router;