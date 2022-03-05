const asyncHandler = require("express-async-handler");
const Table = require ("../models/orderModel");
const QRCode = require('qrcode');
const axios = require('axios');

// order Create API
const orderCreate = asyncHandler(async(req, res) => {

        const { Menu_id} = req.body;
        const insertAbleObject = new Table(
            {
                Table_id: req.params.table_id,
                Menu_id,
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
    
module.exports = {
 orderCreate,
 
};

