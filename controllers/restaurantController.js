const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/restaurant");
const QRCode = require("qrcode");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const { token } = require("morgan");

//Login for Restaurant owner
const RestaurantCreate = asyncHandler(async (req, res) => {
  //console.log(req)
  const { Restaurant_name, branch_name, Address } = req.body;
  const user_id = req.headers.authorization;
  var decoded = jwt_decode(user_id);
  //console.log(decoded);
  //calling external api for lat long
  const response = await axios.get(
    `https://geocode.maps.co/search?q=${Address}`
  );
  const data = response.data;
  const Lat = data[0].lat;
  const Lng = data[0].lon;

  const resItem = new Restaurant({
    Restaurant_owner_id: decoded.id,
    branch_name,
    Restaurant_name,
    Address,
    Lat,
    Lng,
    Code: null,
    Qr_code_path: null,
  });
  try {
    const insertData = await resItem.save();
    const id = insertData._id;
    const code = await QRCode.toDataURL(`
        Bestaurant_name: ${Restaurant_name},
        Branch_name: ${branch_name},
        Address: ${Address},
        `);
    let base64Data = code.replace(/^data:image\/\w+;base64,/, "");
    let fileName = id;
    fileName += ".png";
    let FilePath = `./public/QRCodes/${fileName}`;
    let imageLocation = `./QRCodes/${fileName}`;
    require("fs").writeFileSync(
      FilePath,
      base64Data,
      "base64",
      function (err) {}
    );
    const restuarent = await Restaurant.findById(id);
    if (restuarent) {
      restuarent.Restaurant_name =
        Restaurant_name || restuarent.Restaurant_name;
      restuarent.Code = id || restuarent.Code;
      restuarent.Qr_code_path = imageLocation || restuarent.Qr_code_path;
    }
    try {
      updateRestaurant = await restuarent.save();
      res.status(201).json({
        message: "Restaurant created successfully!",
        data: updateRestaurant,
      });
    } catch (error) {
      return res.status(400).json({ error: error.toString() });
    }
  } catch (error) {
    console.log(error);
  }
  return true;
});
const getSingleRestaurant = asyncHandler(async (req, res) => {
  const restuarent = await Restaurant.findById(req.params.id);
  try {
    res.status(200).json({
      message: "successfully get restuarent data",
      data: restuarent,
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
const GetAllRestaurant = asyncHandler(async (req, res) => {
  // console.log(req);
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt_decode(token);

  const Restaurant_owner_id = decoded.id;

  try {
    const restaurants = await Restaurant.find({
      Restaurant_owner_id: Restaurant_owner_id,
    });
    res.status(200).json({
      message: "All restaurant get successfully!",
      data: restaurants,
    });
  } catch (error) {
    res.json({ message: error });
  }
});
////Registration for Restaurant owner
const RestaurantUpdate = asyncHandler(async (req, res) => {
  const restuarent = await Restaurant.findById(req.params.id);
  const { Address } = req.body;
  //calling external api for lat long
  const response = await axios.get(
    `https://geocode.maps.co/search?q=${Address}`
  );
  const data = response.data;
  const Lat = data[0].lat;
  const Lng = data[0].lon;
  if (restuarent) {
    restuarent.Restaurant_name =
      req.body.Restaurant_name || restuarent.Restaurant_name;
    restuarent.branch_name = req.body.branch_name || restuarent.branch_name;
    restuarent.Code = req.body.Code || restuarent.Code;
    restuarent.Qr_code_path = req.body.Qr_code_path || restuarent.Qr_code_path;
    restuarent.Address = req.body.Address || restuarent.Address;
    restuarent.Lat = Lat || restuarent.Lat;
    restuarent.Lng = Lng || restuarent.Lat;
  }
  try {
    updateRestaurant = await restuarent.save();
    res.status(201).json({
      message: "Restaurant updated successfully!",
    });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
module.exports = {
  RestaurantCreate,
  RestaurantUpdate,
  GetAllRestaurant,
  getSingleRestaurant,
};
