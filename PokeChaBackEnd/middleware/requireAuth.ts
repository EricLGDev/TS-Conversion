let jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let ObjectId = require('mongoose').Types.ObjectId


const requireAuth = async (req: { headers: { authorization: any }; user: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any } } }, next: () => void) => {
    // CHECK IF USER IS AUTHENTICATED
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1];

    try {
        const id  = new ObjectId(jwt.verify(token, process.env.SECRET))
        req.user = await User.findOne(id).select('id')

        next()
    } catch (err) {
        res.status(401).json({error: 'Unauthorized request'})
    }
}

module.exports = requireAuth
export {}
