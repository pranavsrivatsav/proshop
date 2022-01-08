import express from 'express';
import {
  loginUser,
  logoutUser,
  getUserProfile,
  registerUser,
  UpdateUserProfile,
  addAddress,
  editAddress,
  deleteAddress,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

/*
router.route(<route>).<request method>(<handler function>)
passes the req,res objects to the handler function
*/
router.post('/login', loginUser);
router.post('/', registerUser);
router.get('/logout', auth, logoutUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, UpdateUserProfile);
router.post('/address', auth, addAddress);
router.put('/address/:id', auth, editAddress);
router.delete('/address/:id', auth, deleteAddress);

export default router;
