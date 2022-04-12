const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const QRCode = require("qrcode");
const axios = require("axios");
const QrCode = require("../models/qrCodeModel");

// order Create API
const orderCreate = asyncHandler(async (req, res) => {
  //   console.log("api called");
  var orderDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const { orderItems } = req.body;
  const insertAbleObject = new Order({
    Table_id: req.params.table_id,
    orderItems,
    Restaurant_id: req.params.res_id,
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
          : "order for this restaurent",
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
          : "No order found for this restaurent",
      data: result,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  let order = await Order.findById(req.params.order_id);
  const { status } = req.body;
  if (order) {
    order.status = status;
  }
  try {
    const responseData = await order.save();
    res.status(201).json({
      message: "order updated successfully..!",
    });
  } catch (error) {}
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
    const result = await QrCode.find();
    res.status(200).json({
      message: "Total qr code retrieve successfully..",
      data: {
        total_scan: result[0].Total,
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
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  return `${days} days ${hours} hours ${minutes} minutes and ${sec} `;
}

module.exports = {
  orderCreate,
  getAllOrder,
  updateOrder,
  orderByDate,
  getQrCodeScan,
  getOrderKitchenEffeciency,
};
