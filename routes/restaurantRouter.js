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
const { tableCreate, getsingleTable } = require("../controllers/tableController");
const { categoryCreate, getAllCategory } = require("../controllers/CategoryController");
const {menuCreate, getMenuByResId}=require("../controllers/menuController");

//restaurent related path
router.route("/get_all").get(protect,GetAllRestaurant);
router.route("/create").post(protect,RestaurantCreate);
router.route("/update/:id").patch(protect,RestaurantUpdate);
router.route("/:id").get(protect,getSingleRestaurant);

//branch related path
router.route("/:res_id/branch/create").post(protect,branchCreate);
router.route("/:res_id/branch/:branch_id").get(protect,getSingleBranch);
router.route("/:res_id/branch/update/:branch_id").patch(protect,updateBranch)

//table related path
router.route("/:res_id/table/create").post(protect,tableCreate);
router.route("/:res_id/table/:table_id").get(protect,getsingleTable);

//food category related path
router.route("/:res_id/food_category/create").post(protect,categoryCreate)
router.route("/:res_id/food_category").get(protect,getAllCategory)

// menu created path
router.route("/:res_id/menu/create").post(protect,menuCreate);
router.route("/:res_id/menu").get(protect,getMenuByResId);

module.exports = router;
