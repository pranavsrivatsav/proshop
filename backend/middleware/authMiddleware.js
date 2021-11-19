import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const auth = asyncHandler(async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new Error();
      }

      req.user = user;
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not Authorized. Access Denied');
  }

  next();
});

export default auth;
