const asyncHandler = require("express-async-handler");
const Table = require("../models/tableModel");
const QRCode = require('qrcode')
const axios = require('axios');

//table Create API
const tableCreate = asyncHandler(async (req, res) => {
     const { Table_number } = req.body;
     const Restaurant_id = req.params.res_id;
     const DatabaseData = await Table.find({ Restaurant_id }).select('Table_number');
     const DatabaseTableNumbers = DatabaseData.map((item)=>{
       return item.Table_number;
     })
     if(DatabaseData !=null){
        if(DatabaseTableNumbers.includes(Table_number)){
            return res.status(403).json({ message: "table already exist"});
        }
     }
     const insertAbleObject = new Table(
        {
            Table_number,
            Restaurant_id: req.params.res_id
        }
     )
    try {
        const insertData = await insertAbleObject.save();
        const id = insertData._id;
        let result = `https://digi-res.netlify.app/api/res/${req.params.res_id}/1/${id}/menu`;
        const code = await QRCode.toDataURL(`${result}`);
        let base64Data = code.replace(/^data:image\/\w+;base64,/, "");
        let fileName = id;
            fileName+='.png';
        let FilePath = `./public/QRCodes/${fileName}`
        let imageLocation = `./QRCodes/${fileName}`
        require("fs").writeFileSync(FilePath, base64Data, 'base64', function(err) {
          
        });
        const table = await Table.findById(id)
        if(table){
            table.Table_number = Table_number || table.Table_number
            table.Code = id || table.Code
            table.Qr_code_path = imageLocation || table.Qr_code_path
        }
        try {
            updateTable = await table.save();
            updateTable.message = "Table created successfully"
            res.status(201).json(updateTable)
        } catch (error) {
          return res.status(400).json({ error: error.toString() });
        }
    } catch (error) {
        console.log(error);
    }
    return true;
});
const getsingleTable = asyncHandler(async(req,res)=>{
  const table = await Table.findById(req.params.table_id)
  try {
    res.status(200).json({
      message: "successfully get table data",
      data: table
  })
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
})
const GetAllTable = asyncHandler(async (req,res) => {
  try {
    const Tables = await Table.find({});
    res.status(200).json({
      message: "All Table get successfully!",
      data: Tables,
  })
  } catch (error) {
    res.json({ message: error });
  }
})
////Registration for Table owner
const tableUpdate = asyncHandler(async (req, res) => {

  const table = await Table.findById(req.params.id)
  const { Address } = req.body;
    //calling external api for lat long
  const response = await axios.get(`https://geocode.maps.co/search?q=${Address}`);
  const data = response.data;
  const Lat = data[0].lat
  const Lng = data[0].lon;
  if(table){
      table.Table_name = req.body.Table_name || table.Table_name
      table.branch_name = req.body.branch_name || table.branch_name
      table.Code = req.body.Code || table.Code
      table.Qr_code_path = req.body.Qr_code_path || table.Qr_code_path
      table.Address = req.body.Address || table.Address
      table.Lat = Lat || table.Lat
      table.Lng = Lng || table.Lat
  }
  try {
      updateTable = await table.save();
      res.status(201).json({
        message: "Table updated successfully!",
    })
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
module.exports = {
 tableCreate,
 tableUpdate,
 GetAllTable,
 getsingleTable,
};