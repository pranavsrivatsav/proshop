import asyncHandler from 'express-async-handler'; // package to handle async-await errors
import generator from 'generate-password';

import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';
import socialLoginVerify from '../utils/socialLoginUtils/socialLoginVerify.js';

// @desc Auth user & get Token
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  if (req.query.platform) {
    await SocialLoginUser(req, res);
  } else {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error('Account does not exist');
    }

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res
        .cookie('token', token, { httpOnly: true, maxAge: 7 * 60 * 60 * 1000 })
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
    } else {
      res.status(401);
      throw new Error('Invalid Email or Password');
    }
  }
});

// @desc Auth Social Login & Verify Social Token
// @route POST /api/users/login?platform={platform}
// @access public
const SocialLoginUser = async (req, res) => {
  const { email, id } = req.body;
  const { name } = id;
  const platform = req.query.platform;
  const verified = await socialLoginVerify(email, id, platform);

  if (!verified) {
    res.status(400);
    throw new Error(`Unable to login with ${platform}`);
  }

  let user = await User.findOne({ email });

  if (!user) {
    const password = generator.generate({
      length: 16,
      symbols: true,
    });

    user = await User.create({
      name,
      email,
      password,
    });
  }

  const token = generateToken(user._id);

  res.cookie('token', token, { httpOnly: true }).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

// @desc Auth user & get Token
// @route POST /api/users/login
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).send();
});

// @desc Create a new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).cookie('token', token, { httpOnly: true }).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Incorrect data. User Registration failed');
  }
});

// @desc Read user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc Create user address
// @route POST /api/users/address
// @access private
const addAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  user.addresses.push(req.body.address);
  const updatedUser = await user.save();

  res.json({
    user: updatedUser,
  });
});

// @desc Edit user address
// @route PUT /api/users/address
// @access private
const editAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const addressId = req.params.id;
  const addressIndex = user.addresses.findIndex(
    (address) => address._id.toString() === addressId
  );

  if (addressIndex < 0) {
    res.status(404);
    throw new Error('Address not found');
  }

  user.addresses[addressIndex] = req.body.address;
  const updatedUser = await user.save();

  res.json({
    user: updatedUser,
  });
});

// @desc Delete user address
// @route delete /api/users/address
// @access private
const deleteAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const addressId = req.params.id;
  const addressIndex = user.addresses.findIndex(
    (address) => address._id.toString() === addressId
  );

  if (addressIndex < 0) {
    res.status(404);
    throw new Error('Address not found');
  }

  user.addresses.splice(addressIndex, 1);
  const updatedUser = await user.save();

  res.json({
    user: updatedUser,
  });
});

export {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  UpdateUserProfile,
  addAddress,
  editAddress,
  deleteAddress,
};
