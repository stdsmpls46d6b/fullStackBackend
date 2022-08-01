import { validationResult } from 'express-validator'

export default (req, res, next) => {
    let vErr = validationResult(req)
    if (!vErr.isEmpty()) {
        return res.status(400).json(vErr.array())
    }

    next()
}