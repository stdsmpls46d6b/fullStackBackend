import jwt from 'jsonwebtoken'
import config from '../config.js'

export default (req, res, next) => {
    let token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (!token) {
        return res.status(403).json({status: 'client error', message: 'no token'})
    }

    try {
        let decoded = jwt.verify(token, config.jwtToken)
        req.userTokenData = decoded
        req.userId = decoded._id
        next()
    } catch (err) {
        return res.status(401).json({status: 'client error', message: 'incorrect token'})
    }

    // res.send(token)
}
