const express = require("express");
const router = express.Router();
const {
  ownerLogin,
  ownerRegistration
} = require("../controllers/resOwnerController");

router.route("/register").post(ownerRegistration);
router.route("/login").post(ownerLogin);

module.exports = router;