const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const User = require("../models/resOwner");
const QRCode = require("qrcode");
const axios = require("axios");
const QrCode = require("../models/qrCodeModel");
const totalScan = require("../models/totalScanModel");
const ShortUniqueId = require("short-unique-id");
const jwt_decode = require("jwt-decode");
const Restaurant = require("../models/restaurant");
// order Create API
const orderCreate = asyncHandler(async (req, res) => {
  const uid = new ShortUniqueId({ length: 8 });
  var orderDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const { orderItems } = req.body;
  const insertAbleObject = new Order({
    Table_id: req.params.table_id,
    orderItems,
    Restaurant_id: req.params.res_id,
    Order_id: Math.floor(Math.random() * 90000000) + 10000000,
    orderDate: orderDate,
  });
  try {
    let result = await insertAbleObject.save();
    result.set("Message", "Order created successfully...", { strict: false });
    res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
//get all order
const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ Restaurant_id: req.params.res_id });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const table_id = order.Table_id;
      const tableData = await Table.findById(table_id, {
        Table_number: 1,
        _id: 0,
      });
      order.set("Table_number", tableData.Table_number, { strict: false });
      finalResult.push(order);
    }
    //order is an array .
    res.status(200).json({
      message:
        finalResult.length > 0
          ? "Get all Order succcesfully..."
          : "Order found for this restaurent",
      data: finalResult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

//get all pending order
const getPendingandAcceptedOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      Restaurant_id: req.params.res_id,
      status: { $in: [0, 1] },
    });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const table_id = order.Table_id;
      const tableData = await Table.findById(table_id, {
        Table_number: 1,
        _id: 0,
      });
      order.set("Table_number", tableData.Table_number, { strict: false });
      finalResult.push(order);
    }
    res.status(200).json({
      message:
        finalResult.length > 0
          ? "Get all Order succcesfully..."
          : "Order found for this restaurent",
      data: finalResult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});
//get all accepted order
// const getAcceptedOrder = asyncHandler(async (req, res) => {
//   console.log("accepted");
// });
//get all completed order
const getCompletedOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      Restaurant_id: req.params.res_id,
      status: 2,
    });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const table_id = order.Table_id;
      const tableData = await Table.findById(table_id, {
        Table_number: 1,
        _id: 0,
      });
      order.set("Table_number", tableData.Table_number, { strict: false });
      finalResult.push(order);
    }
    res.status(200).json({
      message:
        finalResult.length > 0
          ? "Get all Order succcesfully..."
          : "Order found for this restaurent",
      data: finalResult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});
//get all cancalled order
const getCancelledOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      Restaurant_id: req.params.res_id,
      status: 3,
    });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const table_id = order.Table_id;
      const tableData = await Table.findById(table_id, {
        Table_number: 1,
        _id: 0,
      });
      order.set("Table_number", tableData.Table_number, { strict: false });
      finalResult.push(order);
    }
    res.status(200).json({
      message:
        finalResult.length > 0
          ? "Get all Order succcesfully..."
          : "Order found for this restaurent",
      data: finalResult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});
const orderByDate = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ Restaurant_id: req.params.res_id });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      const table_id = order.Table_id;
      const tableData = await Table.findById(table_id, {
        Table_number: 1,
        _id: 0,
      });
      order.set(
        "Table_number",
        tableData.Table_number ? tableData.Table_number : 0,
        { strict: false }
      );
      finalResult.push(order);
    }
    // let result = finalResult.groupBy(({ status }) => status);
    // console.log(result);
    //order is an array .

    const result = groupByKey(finalResult, "orderDate");

    res.status(200).json({
      message:
        result.length > 0
          ? "Get all Order succcesfully..."
          : "Order found for this restaurent",
      data: result,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.order_id);
  const { status } = req.body;
  if (order !== null) {
    order.status = status;
    try {
      const responseData = await order.save();
      res.status(201).json({
        message: "order updated successfully..!",
      });
    } catch (error) {
      return res.status(400).json({ error: error.toString() });
    }
  } else {
    return res.status(400).json({ error: "invalid order id" });
  }
});

function groupByKey(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}

const getQrCodeScan = asyncHandler(async (req, res) => {
  try {
    const res_id = req.params.res_id;
    const result = await totalScan.find({ res_id: res_id });
    res.status(200).json({
      message: "Total qr code retrieve successfully..",
      data: {
        total_scan: result.length,
      },
    });
  } catch (error) {
    res.json({ message: error });
  }
});

const getOrderKitchenEffeciency = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ Restaurant_id: req.params.res_id });
    const finalResult = [];
    for (let index = 0; index < orders.length; index++) {
      const { _id, Serving_time, createdAt } = orders[index];

      const orderdate = new Date(Serving_time);
      const deliverdate = new Date(createdAt);
      const milisecond = Math.abs(deliverdate - orderdate);
      const effeciency = datetime(milisecond);
      const newobj = {
        order_id: _id,
        kitchen_efficiency: effeciency,
      };
      finalResult.push(newobj);
    }
    //order is an array .
    res.status(200).json({
      message:
        finalResult.length > 0
          ? "Get kitchen information succcesfully..."
          : "kitchen information not found for this restaurent",
      data: finalResult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

function datetime(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes =
    Math.floor(hoursms / (60 * 1000)) + hours * 60 + days * 24 * 60;
  //const minutesms = ms % (60 * 1000);
  //const sec = Math.floor(minutesms / 1000);
  return ` ${minutes} minutes `;
}

module.exports = {
  orderCreate,
  getAllOrder,
  updateOrder,
  orderByDate,
  getQrCodeScan,
  getOrderKitchenEffeciency,
  getCompletedOrder,
  // getPendingOrder,
  getPendingandAcceptedOrder,
  getCancelledOrder,
};