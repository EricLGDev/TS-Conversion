const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '24h' })
}

// LOGIN
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const user_id = user.id
    
    // CREATE TOKEN
    const token = createToken(user.id)
    

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

// SIGNUP
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // CREATE TOKEN
    const token = createToken(user.id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



module.exports = { signupUser, loginUser }