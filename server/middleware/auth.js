const { clerkMiddleware, requireAuth } = require('@clerk/express');

/**
 * Express middleware that uses Clerk SDK to protect routes
 */
const protect = (req, res, next) => {
  const secretKey = process.env.CLERK_SECRET_KEY;

  // If no Clerk secret key is configured yet in environment, allow request through with default context
  if (!secretKey || secretKey.includes('your_clerk_secret')) {
    req.user = { id: 'clerk_user_default', email: 'user@thinked.ai' };
    return next();
  }

  // Use Clerk's requireAuth middleware
  return requireAuth({
    onError: (err) => {
      res.status(401).json({ message: 'Unauthorized - Invalid Clerk Session Token' });
    },
  })(req, res, (err) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    if (req.auth && req.auth.userId) {
      req.user = { id: req.auth.userId };
    } else {
      req.user = { id: 'clerk_user_default' };
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
