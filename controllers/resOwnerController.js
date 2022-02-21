const asyncHandler = require("express-async-handler");
const User = require("../models/resOwner");
const {wrongLogin, userExist, successLogin, successreg} = require("../Helper/Response")
const generateToken = require("../utils/generateToken");
const Restaurant = require("../models/restaurant");
const QRCode = require('qrcode')
const axios = require('axios');
//Login for Restaurant owner 
const ownerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const result = await Restaurant.find({Restaurant_owner_id: user._id});
    res.json({
      message: successLogin,
      _id: user._id,
      res_id: result[0]._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(wrongLogin);
  }
});

////Registration for Restaurant owner
const ownerRegistration = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({'error': userExist});
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });

  try {
    const createOwner = await user.save();
    // console.log("created")
    // console.log(createOwner)
    user_id = createOwner._id;
    const {
      Restaurant_name,
      Address,
  } = req.body;

  //calling external api for lat long
  const response = await axios.get(`https://geocode.maps.co/search?q=${Address}`);
  const data = response.data;
  const Lat = data[0].lat
  const Lng = data[0].lon;

  const resItem = new Restaurant({
      Restaurant_owner_id: user_id,
      Restaurant_name,
      Address,
      Lat,
      Lng,
      Code: null,
      Qr_code_path: null,
  })
  try {
      const insertData = await resItem.save();
      const id = insertData._id;
      const code = await QRCode.toDataURL(`${id}`);
      let base64Data = code.replace(/^data:image\/\w+;base64,/, "");
      let fileName = id;
          fileName+='.png';
      let FilePath = `./QRCodes/${fileName}`
      require("fs").writeFile(FilePath, base64Data, 'base64', function(err) {
        
      });
      const restuarent = await Restaurant.findById(id)
      if(restuarent){
          restuarent.Restaurant_name = Restaurant_name || restuarent.Restaurant_name
          restuarent.Code = id || restuarent.Code
          restuarent.Qr_code_path = FilePath || restuarent.Qr_code_path
      }
      try {
          updateRestaurant = await restuarent.save();
        //   res.status(201).json({
        //     message: "Restaurant created successfully!",
        // })
      } catch (error) {
        // return res.status(400).json({ error: error.toString() });

      }
   }catch (error) {
      console.log(error);
   }


   //res_id will be sent as response 
   const result = await Restaurant.find({Restaurant_owner_id: user_id});
    res.json({
      message: successreg,
      data: result,
    });
  } catch (error) {
    console.log(error)
  }
});
module.exports = {
  ownerLogin,
  ownerRegistration,
};