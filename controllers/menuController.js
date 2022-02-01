const asyncHandler = require("express-async-handler");
const Table = require ("../models/menuModel");
const QRCode = require('qrcode');
const axios = require('axios');

// menu Create API
const menuCreate = asyncHandler(async(req, res) => {

    const { Item_name, Price, Quantity, Category_id } = req.body;
    const insertAbleObject = new Table(
        {
            Item_name,
            Price,
            Quantity,
            Category_id,
            Restaurant_id: req.params.res_id
        }
     )
     try {
         const result = await insertAbleObject.save();
         res.status(201).json({
            message: "Menu created successfully",
            data: result
        })
     } catch (error) {
        return res.status(400).json({ error: error.toString() });
     }
})
const getMenuByResId = asyncHandler(async(req,res)=>{
    const res_id = req.params.res_id;
    try {
        const result = await Table.find({Restaurant_id: res_id});
        res.status(201).json({
            message: "get all menu successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
})
module.exports = {
 menuCreate,
 getMenuByResId
};

