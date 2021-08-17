import express from 'express';
import asyncHandler from 'express-async-handler'; // package to handle async-await errors

import Product from '../models/productModel.js';

const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'products not found' });
    }
  })
);

// @desc Fetch a product by id
// @route GET /api/products/:id
// @access public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
