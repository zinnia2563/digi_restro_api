const express = require("express");
const protect = require('../middleware/authMiddleWare')
const router = express.Router();
const {
 RestaurantCreate,
 RestaurantUpdate
} = require("../controllers/restaurantController");

router.route("/create").post(protect,RestaurantCreate);
router.route("/update/:id").put(protect,RestaurantUpdate);

module.exports = router;