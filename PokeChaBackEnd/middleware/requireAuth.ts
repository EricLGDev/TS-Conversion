let  jwt = require('jsonwebtoken')
let  User = require('../models/userModel')
let  ObjectId = require('mongoose').Types.ObjectId


let requireAuth = async (req: { headers: { authorization: any }; user: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any } } }, next: () => void) => {
    // CHECK IF USER IS AUTHENTICATED
    let { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    let token = authorization.split(' ')[1];

    try {
        let id  = new ObjectId(jwt.verify(token, process.env.SECRET))
        req.user = await User.findOne(id).select('id')

        next()
    } catch (err) {
        res.status(401).json({error: 'Unauthorized request'})
    }
}

module.exports = requireAuth
export {}
