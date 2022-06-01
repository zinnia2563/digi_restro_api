const asyncHandler = require("express-async-handler");
const Table = require("../models/menuModel");
const QrCode = require("../models/qrCodeModel");
const totalScan = require("../models/totalScanModel");
const QRCode = require("qrcode");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
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
  // for qr code scan count
  const scanObj = new totalScan({
    res_id: res_id,
  });
  await scanObj.save();
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
module.exports = {
  menuCreate,
  getMenuByCategoryName,
  getAllmenuByRestaurent,
};
