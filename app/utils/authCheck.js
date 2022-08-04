import jwt from 'jsonwebtoken'
import config from '../config.js'
import userModel from '../modeles/users.js'

export default async (req, res, next) => {
    let token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return res.status(403).json({status: 'client error', message: 'no token'})
    }

    try {
        let decoded = jwt.verify(token, config.jwtToken)
        req.userTokenData = decoded
        req.userId = decoded._id

        let user = await userModel.findById(req.userId)
        if (!user) {
            return res.status(401).json({status: 'client error'})
        }

        req.userData = user

        next()
    } catch (err) {
        return res.status(401).json({status: 'client error', message: 'incorrect token'})
    }

    // res.send(token)
}
