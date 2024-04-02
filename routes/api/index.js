const router = require('express').Router();
// Import all of the API routes from /api/index.js
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;