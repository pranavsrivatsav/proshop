import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/ProductModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //delete all existing data
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    //insert users
    const createdUsers = await User.insertMany(users);

    //get admin user id- expected to be the first element in the data
    const adminUser = createdUsers[0]._id;

    //attach admin user to each of the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //insert products
    await Product.insertMany(sampleProducts);

    console.log(colors.green.inverse('Data Imported Successfully.'));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //delete all existing data
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log(colors.red.inverse('Data destroyed!'));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1);
  }
};

//handle command-line argument
//seeder.js -> import data
// seeder.js -d -> destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
