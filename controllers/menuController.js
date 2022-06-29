const asyncHandler = require("express-async-handler");
const Table = require("../models/menuModel");
const QrCode = require("../models/qrCodeModel");
const totalScan = require("../models/totalScanModel");
const QRCode = require("qrcode");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const _ = require("lodash");
// menu Create API
const menuCreate = asyncHandler(async (req, res) => {
  const { Category_Name, Item_name, Price, Quantity, Category_id, Uom } =
    req.body;
  const insertAbleObject = new Table({
    Category_Name,
    Item_name,
    Price,
    Quantity,
    Category_id,
    Uom,
    status: 1,
    Restaurant_id: req.params.res_id,
  });
  try {
    const result = await insertAbleObject.save();
    res.status(201).json({
      message: "Menu created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const getSingleMenu = asyncHandler(async (req, res) => {
  const res_id = req.params.res_id;
  const menu_id = req.params.menu_id;
  const result = await Table.find({
    Restaurant_id: res_id,
    _id: menu_id,
    status: 1,
  });
  try {
    res.status(200).json({
      message: "successfully get menu data",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const getMenuByCategoryName = asyncHandler(async (req, res) => {
  const category_name = req.params.category_name;
  try {
    const result = await Table.find({ Category_Name: category_name });
    res.status(201).json({
      message: `get all ${category_name} menu successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const getAllmenuByRestaurent = asyncHandler(async (req, res) => {
  const res_id = req.params.res_id;
  // const { scan } = req.body;
  // // for qr code scan count
  // if (scan) {
  //   const scanObj = new totalScan({
  //     res_id: res_id,
  //   });
  //   await scanObj.save();
  // }

  //find all menu for this table...
  try {
    const result = await Table.find({ Restaurant_id: res_id });
    res.status(201).json({
      message: `get all  menu successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const getForReactApplication = asyncHandler(async (req, res) => {
  const res_id = req.params.res_id;
  const { scan } = req.body;
  // for qr code scan count
  if (scan) {
    const scanObj = new totalScan({
      res_id: res_id,
    });
    await scanObj.save();
  }
  //find all menu for this table...
  try {
    const result = await Table.find({ Restaurant_id: res_id, status: 1 });
    res.status(201).json({
      message: `get all  menu successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
////Registration for Restaurant owner
const MenuUpdate = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const menu = await Table.findById(req.params.id);

  if (menu) {
    menu.Restaurant_id = req.body.Restaurant_id || menu.Restaurant_id;
    menu.Category_Name = req.body.Category_Name || menu.Category_Name;
    menu.Code = req.body.Code || menu.Code;
    menu.Item_name = req.body.Item_name || menu.Item_name;
    menu.Price = req.body.Price || menu.Price;
    menu.Quantity = req.body.Quantity || menu.Quantity;
    menu.status = req.body.status;
    menu.total_available = req.body.total_available || menu.total_available;
    console.log("status is ", req.body.status);
    console.log("new menu object is ", menu);
  }
  try {
    updateMenu = await menu.save();
    res.status(201).json({
      message: "Menu updated successfully!",
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
module.exports = {
  menuCreate,
  MenuUpdate,
  getSingleMenu,
  getForReactApplication,
  getMenuByCategoryName,
  getAllmenuByRestaurent,
};
