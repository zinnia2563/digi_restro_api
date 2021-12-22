const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurant");
const QRCode = require('qrcode')
//Login for Restaurant owner 
const RestaurantCreate = asyncHandler(async (req, res) => {
    const {
        Restaurant_name,
        branch_name,
    } = req.body;
    const resItem = new Restaurant({
        Restaurant_owner_id: req.user._id,
        branch_name,
        Restaurant_name,
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
            res.status(201).json({
              message: "Restaurant created successfully!",
          })
        } catch (error) {
          return res.status(400).json({ error: error.toString() });
        }
    } catch (error) {
        console.log(error);
    }
});

////Registration for Restaurant owner
const RestaurantUpdate = asyncHandler(async (req, res) => {

  const restuarent = await Restaurant.findById(req.params.id)
  if(restuarent){
      restuarent.Restaurant_name = req.body.Restaurant_name || restuarent.Restaurant_name
      restuarent.branch_name = req.body.branch_name || restuarent.branch_name
      restuarent.Code = req.body.Code || restuarent.Code
      restuarent.Qr_code_path = req.body.Qr_code_path || restuarent.Qr_code_path
  }
  try {
      updateRestaurant = await restuarent.save();
      res.status(201).json({
        message: "Restaurant updated successfully!",
    })
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
});
module.exports = {
 RestaurantCreate,
 RestaurantUpdate
};