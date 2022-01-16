const asyncHandler = require("express-async-handler");
const Branch = require("../models/branchModel");
const axios = require('axios');
//Login for Branch owner 
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
const getSingleBranch = asyncHandler(async(req,res)=> {
    const branch = await Branch.findById(req.params.branch_id)
    try {
      res.status(200).json({
        message: "successfully get branch data",
        data: branch
    })
    } catch (error) {
      return res.status(400).json({ error: error.toString() });
    }
})
const updateBranch = asyncHandler(async(req,res) => {
  const branch = await Branch.findById(req.params.branch_id)
  const { Address } = req.body;
  //calling external api for lat long
  const response = await axios.get(`https://geocode.maps.co/search?q=${Address}`);
  const data = response.data;
  const Lat = data[0].lat
  const Lng = data[0].lon;

  if(branch){
      branch.Res_id  = req.params.res_id || branch.Res_id
      branch.Branch_name = req.body.Branch_name || branch.Branch_name
      branch.Address = req.body.Address || branch.Address
      branch.Lat = Lat || branch.Lat
      branch.Lng = Lng || branch.Lat
  }
  try {
      const responseData = await branch.save();
      res.status(201).json({
        message: "Branch updated successfully!",
    })
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
})
module.exports = {
 branchCreate,
 getSingleBranch,
 updateBranch
};