// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ---------------------
// Firebase Admin Setup
// ---------------------
if (
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
) {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE || 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase Admin initialized.');
} else {
  console.warn(
    'Firebase environment variables missing. Auth will not work until configured.'
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
