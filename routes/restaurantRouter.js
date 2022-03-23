const express = require("express");
const protect = require("../middleware/authMiddleWare");
const router = express.Router();
const {
  RestaurantCreate,
  RestaurantUpdate,
  GetAllRestaurant,
  getSingleRestaurant,
} = require("../controllers/restaurantController");
const {
  branchCreate,
  getSingleBranch,
  updateBranch,
} = require("../controllers/branchController");
const {
  tableCreate,
  getsingleTable,
  GetAllTable,
} = require("../controllers/tableController");
const {
  categoryCreate,
  getAllCategory,
} = require("../controllers/CategoryController");
const {
  menuCreate,
  getMenuByCategoryName,
  getAllmenuByRestaurent,
} = require("../controllers/menuController");
const {
  orderCreate,
  getAllOrder,
  updateOrder,
} = require("../controllers/orderController");

//restaurent related path
router.route("/get_all").get(GetAllRestaurant);
router.route("/create").post(RestaurantCreate);
router.route("/update/:id").patch(RestaurantUpdate);
router.route("/:id").get(getSingleRestaurant);

//branch related path
router.route("/:res_id/branch/create").post(protect, branchCreate);
router.route("/:res_id/branch/:branch_id").get(protect, getSingleBranch);
router.route("/:res_id/branch/update/:branch_id").patch(protect, updateBranch);

//table related path
router.route("/:res_id/table/create").post(protect, tableCreate);
router.route("/:res_id/table/:table_id").get(protect, getsingleTable);
router.route("/:res_id/table/").get(protect, GetAllTable);

//food category related path
router.route("/:res_id/food_category/create").post(protect, categoryCreate);
router.route("/:res_id/food_category").get(protect, getAllCategory);

// menu created path
router.route("/:res_id/menu/create").post(protect, menuCreate);
router.route("/:res_id/menu/").get(getAllmenuByRestaurent);
router
  .route("/:res_id/menu/:category_name")
  .get(protect, getMenuByCategoryName);
//router.route("/:res_id/:branch_id/:table_number/menu").get(protect,getMenuByResId);

//order related path
router.route("/:res_id/:branch_id/order").get(getAllOrder);
router.route("/:res_id/table/:table_id/order").post(orderCreate);
router.route("/order/:order_id").patch(updateOrder);

module.exports = router;