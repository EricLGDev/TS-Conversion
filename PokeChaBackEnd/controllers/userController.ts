let User = require('../models/userModel')
let jwt = require('jsonwebtoken')

let createToken = (id: any) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '24h' })
}

// LOGIN
let loginUser = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { email?: any; token?: any; error?: any }): void; new(): any } } }) => {
  let {email, password} = req.body

  try {
    let user = await User.login(email, password)
    let user_id = user.id
    
    // CREATE TOKEN
    let token = createToken(user.id)
    

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: 'Error'})
  }

}

// SIGNUP
let signupUser = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { email?: any; token?: any; error?: any }): void; new(): any } } }) => {
  let {email, password} = req.body

  try {
    let user = await User.signup(email, password)

    // CREATE TOKEN
    let token = createToken(user.id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: 'Error'})
  }
}



module.exports = { signupUser, loginUser }