const asyncHandler = require("express-async-handler");
const Table = require ("../models/orderModel");
const QRCode = require('qrcode');
const axios = require('axios');

// order Create API
const orderCreate = asyncHandler(async(req, res) => {

        const { orderItems} = req.body;
        const insertAbleObject = new Table(
            {
                Table_id: req.params.table_id,
                orderItems,
                Restaurant_id: req.params.res_id
            }
         )
         try {
             let result = await insertAbleObject.save()
             result.set( "Message","Order created successfully...", { strict: false });
             res.status(201).json(result)
         } catch (error) {
            return res.status(400).json({ error: error.toString() });
         }
    })
const getAllOrder = asyncHandler(asyncHandler(async(req,res)=>{
    try {
        const orders = await Table.find({});
        res.status(200).json({
          message: "Get all Order succcesfully...",
          data: orders,
      })
      } catch (error) {
        res.json({ message: error });
      }
}))
module.exports = {
 orderCreate,
 getAllOrder,
};

