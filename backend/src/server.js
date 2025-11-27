// ...existing code...
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect mongodb
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not set in backend/.env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error('Mongo error', err));

// routes
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log(`Server listening on ${port}`));