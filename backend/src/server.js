// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ---------------------
// Firebase Admin Setup
// ---------------------

// --- ADD THIS DEBUGGING BLOCK ---
const fs = require('fs');
const path = require('path');
console.log('Checking for service account key at:', path.resolve(__dirname, './serviceAccountKey.json'));
console.log('Does file exist?', fs.existsSync(path.resolve(__dirname, './serviceAccountKey.json')));
// --- END DEBUGGING BLOCK ---

try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin initialized successfully.');
} catch (error) {
  console.warn(
    'Could not initialize Firebase Admin. Ensure serviceAccountKey.json is in the src/ folder. Auth will not work.'
  );
}

// ---------------------
// MongoDB Connection
// ---------------------
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not set in environment variables');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo error', err));

// ---------------------
// Routes
// ---------------------
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// ---------------------
// Start server
// ---------------------
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
