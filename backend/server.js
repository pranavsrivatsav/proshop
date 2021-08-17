import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

//.js extension needs to be mentioned when importing from local files in native nodejs programs
import connectDB from './config/db.js';
import { notfound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

//Assign route handler for product routes
app.use('/api/products', productRoutes);

//Attaching error handling middleware

/*
  Attach notFound middleware after all the route handlers,
  else will throw a 404 error for all the requests
*/
app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
