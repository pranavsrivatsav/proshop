import mongoose from 'mongoose';
import Product from './productModel.js';

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        qty: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.getCartItems = async function () {
  const cart = this.toObject();

  const detailedCartItems = await Promise.all(
    cart.cartItems.map(async (item) => {
      const product = await Product.findById(item.product);

      return {
        product: item.product,
        qty: item.qty,
        name: product.name,
        image: product.image,
        price: product.price,
        maxQty: Math.min(product.countInStock, product.maxQty),
      };
    })
  );

  return { cartItems: detailedCartItems };
};

const Cart = model('Cart', cartSchema);
export default Cart;
