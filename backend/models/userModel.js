import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import addressSchema from './addressModel.js';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [addressSchema],
    defaultAddress: {
      type: mongoose.Types.ObjectId,
    },
    googleId: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('cart', {
  ref: 'Cart',
  localField: '_id',
  foreignField: 'user',
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!(this.isModified('password') || this.isModified('googleId'))) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt);
  } else if (this.isModified('googleId')) {
    this.googleId = await bcrypt.hash(this.googleId, salt);
  }
});

const User = model('User', userSchema);
export default User;
