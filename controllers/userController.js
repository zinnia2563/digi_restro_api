const asyncHandler = require("express-async-handler");
const User = require("../models/Users");

//@desc    Authorize user & get token
//@route   POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Create new user
//@route POST /api/users
//@access Private/Admin
const createUser = asyncHandler(async (req, res) => {
  console.log("requested");
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({message: "User already exists"});
    // throw new Error("User already exists");
  }

  const user = new User({
    restaurant_id: req.body.restaurant_id,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const createUser = await user.save();
    res.json(createUser);
  } catch (error) {
   
  }
});
module.exports = {
  createUser,
  authUser,
};