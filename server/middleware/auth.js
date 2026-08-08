const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

/**
 * Express middleware that uses Clerk SDK to protect routes
 */
const protect = (req, res, next) => {
  // If no Clerk secret key is configured yet in environment, allow request through with placeholder user context
  if (!process.env.CLERK_SECRET_KEY || process.env.CLERK_SECRET_KEY.includes('your_clerk_secret')) {
    req.user = { id: 'clerk_user_default', email: 'user@thinked.ai' };
    return next();
  }

  // Use Clerk's official express middleware handler
  return ClerkExpressRequireAuth({
    onError: (err) => {
      res.status(401).json({ message: 'Unauthorized - Invalid Clerk Session Token' });
    },
  })(req, res, (err) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    if (req.auth && req.auth.userId) {
      req.user = { id: req.auth.userId };
    }
    next();
  });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    next();
  };
};

module.exports = { protect, authorize };
