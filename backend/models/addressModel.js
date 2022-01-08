import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile no required'],
    validate: {
      validator: function (v) {
        const re = new RegExp('^[6,7,8,9]\\d{9}$');
        return re.test(v);
      },
      message: (props) => `${props.value} is an invalid mobile number`,
    },
  },
  altMobile: {
    type: String,
    validate: {
      validator: function (v) {
        const re = new RegExp('^[6,7,8,9]\\d{9}$');
        return re.test(v);
      },
      message: (props) => `${props.value} is an invalid mobile number`,
    },
  },
  pincode: {
    type: String,
    required: [true, 'Mobile no required'],
    validate: {
      validator: function (v) {
        const re = new RegExp('^[1-9]\\d{5}$');
        return re.test(v);
      },
      message: (props) => `${props.value} is an invalid mobile number`,
    },
  },
  address: {
    type: String,
    required: [true, 'Address required'],
    maxLength: 255,
  },
  state: {
    type: String,
    required: true,
    maxLength: 25,
  },
  landmark: {
    type: String,
    maxLength: 255,
  },
});

export default addressSchema;
