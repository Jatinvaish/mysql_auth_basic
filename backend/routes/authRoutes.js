const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, getUser } = require('../controllers/authController');

// Registration route
router.post('/register', register);

// Email verification route
router.get('/verify-email', verifyEmail);

// Login route
router.post('/login', login);

module.exports = router;
