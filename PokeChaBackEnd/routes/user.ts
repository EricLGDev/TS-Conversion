const express = require('express');

// CONTROLLER FUNCTIONS
const { loginUser, singupUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// ROUTES
// LOGIN
router.post('/login', loginUser)

// SIGNUP
router.post('/signup', signupUser)

module.exports = router