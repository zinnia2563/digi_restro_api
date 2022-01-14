const express = require("express");
const protect = require('../middleware/authMiddleWare')
const router = express.Router();
const {
 RestaurantCreate,
 RestaurantUpdate,
 GetAllRestaurant,
 getSingleRestaurant
} = require("../controllers/restaurantController");
const{branchCreate} = require("../controllers/branchController");

router.route("/get_all").get(protect,GetAllRestaurant);
router.route("/:id").get(protect,getSingleRestaurant);
router.route("/:res_id/branch/create").post(protect,branchCreate)
router.route("/create").post(protect,RestaurantCreate);
router.route("/update/:id").patch(protect,RestaurantUpdate);

module.exports = router;