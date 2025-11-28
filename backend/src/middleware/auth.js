const admin = require('firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
  console.log('--- Verifying Firebase Token ---');
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Auth Error: No Bearer token was provided.');
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log('Token verified successfully for user:', decodedToken.email);
    next(); // Token is valid, proceed to the next step (order creation)
  } catch (error) {
    console.error('Auth Error: Token is invalid.', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

module.exports = verifyFirebaseToken;