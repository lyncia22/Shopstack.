const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';

let adminAuth = null;
let adminFirestore = null;

if (!admin.apps.length) {
  try {
    const resolved = path.resolve(serviceAccountPath);
    if (fs.existsSync(resolved)) {
      // try to require as JSON (service account)
      const sa = require(resolved);
      if (sa && sa.type === 'service_account') {
        admin.initializeApp({ credential: admin.credential.cert(sa) });
        console.log('Firebase Admin SDK initialized successfully.');
      } else {
        console.warn('Found file at', resolved, 'but it is not a service account JSON. If you need admin features, add the proper service account JSON from Firebase Console.');
      }
    } else {
      console.warn('Firebase service account missing. Auth verification will fail until configured.');
    }
  } catch (e) {
    console.error('Failed to initialize Firebase Admin SDK:', e.message);
  }
}

adminAuth = admin.apps.length ? admin.auth() : null;
adminFirestore = admin.apps.length ? admin.firestore() : null;

module.exports = { adminAuth, adminFirestore };

