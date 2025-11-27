const { adminAuth } = require('../config/firebase');

async function verifyFirebaseToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  if (!adminAuth) {
    return res.status(503).json({ error: 'Firebase Admin not initialized' });
  }

  try {
    // This line asks Firebase to verify the token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // The token is valid! Attach user info to the request object
    req.user = decodedToken;
    
    // Continue to the next function (the actual route logic)
    next();
  } catch (error) {
    // The token was invalid
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = verifyFirebaseToken;