const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id: any) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '24h' })
}

// LOGIN
const loginUser = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { email?: any; token?: any; error?: any }): void; new(): any } } }) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const user_id = user.id
    
    // CREATE TOKEN
    const token = createToken(user.id)
    

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: 'Error'})
  }

}

// SIGNUP
const signupUser = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { email?: any; token?: any; error?: any }): void; new(): any } } }) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // CREATE TOKEN
    const token = createToken(user.id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: 'Error'})
  }
}



module.exports = { signupUser, loginUser }