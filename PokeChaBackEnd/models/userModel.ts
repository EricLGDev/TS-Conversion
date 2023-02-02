import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import validator from 'validator'

let Schema = mongoose.Schema

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// sign up method with validation
userSchema.statics.signup = async function(email: any, password: any) {

    // VALIDATE
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    let exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)

    let user = await this.create({ email, password: hash })

    return user
}

//login method
userSchema.statics.login = async function(email: any, password: any) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    let user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    let match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
}


module.exports = mongoose.model('User', userSchema)
export {}