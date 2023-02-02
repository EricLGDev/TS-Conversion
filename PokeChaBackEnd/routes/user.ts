let express = require('express');

// CONTROLLER FUNCTIONS
let { loginUser, singupUser, signupUser } = require('../controllers/userController')

let router = express.Router()

// ROUTES
// LOGIN
router.post('/login', loginUser)

// SIGNUP
router.post('/signup', signupUser)

module.exports = router

export {}