const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const QRCode = require("qrcode");
const axios = require("axios");

// order Create API
const orderCreate = asyncHandler(async (req, res) => {
  //   console.log("api called");
  const { orderItems } = req.body;
  const insertAbleObject = new Order({
    Table_id: req.params.table_id,
    orderItems,
    Restaurant_id: req.params.res_id,
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
          : "No order found for this restaurent",
      data: finalResult,
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
      message: "order updated successfully!",
    });
  } catch (error) {}
});
module.exports = {
  orderCreate,
  getAllOrder,
  updateOrder,
};
