import express from 'express';
import {
  fetchCart,
  addToCart,
  updateCart,
  removeCart,
} from '../controllers/cartController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

/*
router.route(<route>).<request method>(<handler function>)
passes the req,res objects to the handler function
*/
router.get('/', auth, fetchCart);
router.put('/', auth, addToCart);
router.patch('/', auth, updateCart);
router.delete('/:id', auth, removeCart);

export default router;
