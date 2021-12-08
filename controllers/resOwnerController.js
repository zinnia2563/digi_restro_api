const asyncHandler = require("express-async-handler");
const User = require("../models/resOwner");
const {wrongLogin, userExist, successLogin, successreg} = require("../Helper/Response")
//Login for Restaurant owner 
const ownerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: successLogin,
      _id: user._id,
      email: user.email,
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
  });

  try {
    const createOwner = await user.save();
    res.json({
      message: createOwner,
      createUser
    });
  } catch (error) {
   
  }
});
module.exports = {
  ownerLogin,
  ownerRegistration,
};