import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

/*
router.route(<route>).<request method>(<handler function>)
passes the req,res objects to the handler function
*/
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
