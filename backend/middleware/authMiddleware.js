import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(401);
    throw new Error('Not Authorized. Access Denied');
  }
});

export default auth;
