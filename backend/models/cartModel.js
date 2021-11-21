import mongoose from 'mongoose';

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

const Cart = model('Cart', cartSchema);
export default Cart;
