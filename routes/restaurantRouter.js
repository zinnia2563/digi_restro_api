const express = require("express");
const protect = require('../middleware/authMiddleWare')
const router = express.Router();
const {
 RestaurantCreate,
 RestaurantUpdate,
 GetAllRestaurant
} = require("../controllers/restaurantController");

router.route("/create").post(protect,RestaurantCreate);
router.route("/get_all").get(protect,GetAllRestaurant);
router.route("/update/:id").patch(protect,RestaurantUpdate);

module.exports = router;