import asyncHandler from 'express-async-handler';

import Cart from '../models/cartModel.js';

// @desc Fetch cart
// @route GET /api/cart
// @access private
const fetchCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) res.json({ cartItems: [] });
  res.json(await cart.getCartItems());
});

// @desc Add to cart
// @route PUT /api/cart
// @access private
const addToCart = asyncHandler(async (req, res) => {
  const { products } = req.body;

  // const newCartItem = {
  //   product: mongoose.Types.ObjectId(product),
  //   qty,
  // };

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    const newCart = await Cart.create({
      user: req.user._id,
      cartItems: products,
    });

    await newCart.save();
    res.json(await newCart.getCartItems());
  } else {
    const productsMap = products.reduce((map, product) => {
      map[product.product] = product.qty;
      return map;
    }, {});

    let newCartItems = cart.cartItems.filter(
      (item) => !productsMap[item.product]
    );

    newCartItems = newCartItems.concat(products);
    cart.cartItems = newCartItems;

    await cart.save();

    res.json(await cart.getCartItems());
  }
});

// @desc Update cart
// @route PATCH /api/cart
// @access private
const updateCart = asyncHandler(async (req, res) => {
  const { product, qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(400);
    throw new Error('Bad request');
  }

  const cartItem = cart.cartItems.find((item) => item.product == product);

  if (!cartItem) {
    res.status(400);
    throw new Error('Item does not exist in the cart.');
  } else {
    cartItem.qty = qty;
  }

  await cart.save();

  res.send();
});

// @desc Remove from cart / Remove all items from cart
// @route DELETE /api/cart
// @access private
const removeCart = asyncHandler(async (req, res) => {
  const product = req.params.id;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(400);
    throw new Error('Bad request');
  }

  if (product === '*') {
    cart.cartItems = [];
  } else {
    cart.cartItems = cart.cartItems.filter((item) => item.product != product);
  }

  await cart.save();

  res.send();
});

export { addToCart, fetchCart, updateCart, removeCart };
