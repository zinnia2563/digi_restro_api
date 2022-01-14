const asyncHandler = require("express-async-handler");
const Branch = require("../models/branchModel");
const axios = require('axios');
//Login for Restaurant owner 
const branchCreate = asyncHandler(async (req, res) => {
    const {
        Branch_name,
        Address,
    } = req.body;

    //calling external api for lat long
    const response = await axios.get(`https://geocode.maps.co/search?q=${Address}`);
    console.log(response)
    const data = response.data;
    const Lat = data[0].lat
    const Lng = data[0].lon

    const branchItem = new Branch({
        Res_id: req.params.res_id,
        Branch_name,
        Address,
        Lat,
        Lng,
    })
   try {
       const result = await branchItem.save();
       if(result){
        res.status(201).json({
            message: "Branch created successfully...",
        })
       }
   } catch (error) {
    return res.status(400).json({ error: error.toString() });
   }
});

module.exports = {
 branchCreate
};