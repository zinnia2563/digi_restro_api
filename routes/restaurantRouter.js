const express = require("express");
const protect = require('../middleware/authMiddleWare')
const router = express.Router();
const {
 RestaurantCreate,
 RestaurantUpdate,
 GetAllRestaurant,
 getSingleRestaurant
} = require("../controllers/restaurantController");
const{branchCreate,getSingleBranch,updateBranch} = require("../controllers/branchController");

//restaurent related path
router.route("/get_all").get(protect,GetAllRestaurant);
router.route("/create").post(protect,RestaurantCreate);
router.route("/update/:id").patch(protect,RestaurantUpdate);
router.route("/:id").get(protect,getSingleRestaurant);

//branch related path
router.route("/:res_id/branch/create").post(protect,branchCreate);
router.route("/:res_id/branch/:branch_id").get(protect,getSingleBranch);
router.route("/:res_id/branch/update/:branch_id").patch(protect,updateBranch)


module.exports = router;