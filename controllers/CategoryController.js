const asyncHandler = require("express-async-handler");
// const Table = require("../models/tableModel");
const Category = require("../models/categoryModel")
const QRCode = require('qrcode')
const axios = require('axios');

//table Create API
const categoryCreate = asyncHandler(async (req, res) => {
     const {
        Category_name
     } = req.body;

     const insertAbleObject = new Category(
        {
         Restaurant_id: req.params.res_id,
         Category_name,
        }
     )
    try {
        const insertData = await insertAbleObject.save();
        res.status(201).json({
            message: "Food category created successfully!",
        })
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
    return true;
});
const getsingleCategory = asyncHandler(async(req,res)=>{
  const table = await Table.findById(req.params.table_id)
  try {
    res.status(200).json({
      message: "successfully get table data",
      data: table
  })
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const getAllCategory = asyncHandler(async(req,res)=>{
    try {
        const result = await Category.find({Restaurant_id: req.params.res_id});
        res.status(201).json({
            message: "food category get successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
})
module.exports = {
 categoryCreate,
 getsingleCategory,
 getAllCategory,
};