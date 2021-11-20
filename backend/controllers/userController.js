import asyncHandler from 'express-async-handler'; // package to handle async-await errors

import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get Token
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie('token', token, { httpOnly: true }).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

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

export {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  UpdateUserProfile,
};
