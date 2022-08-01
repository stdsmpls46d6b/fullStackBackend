import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import config from '../config.js'

import userModel from '../modeles/users.js'
import { signupValidation, loginValidation } from '../validations.js'
import authCheck from '../utils/authCheck.js'
import validate from '../utils/validationErrorsHandle.js'


export default (app) => {
    app.post('/auth/signup', signupValidation, validate, async (req, res) => {
        try {
    
            let password = req.body.password
            let salt = await bcrypt.genSalt(10)
            let hashash = await bcrypt.hash(password, salt)
    
            let doc = new userModel({
                name: req.body.name,
                email: req.body.email,
                avatarUrl: req.body.avatarUrl,
                passwordHash: hashash
            })
    
            let user = await doc.save()
            
            let token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name
                },
                config.jwtToken,
                { expiresIn: '30d' }
            )
    
            let { passwordHash, ...userData } = user._doc
    
            res.json({
                // ... user
                status: 'succsess',
                token: token,
                user: userData
            })
        } catch (err) {
            if (err.code == 11000) {
                return res.status(400).json({status: 'client error'})
            }
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })


    app.post('/auth/login', loginValidation, validate, async (req, res) => {
        try {

            let user = await userModel.findOne({ email: req.body.email })
            if (!user) {
                return res.status(404).json({status: 'client error'})
            }

            let isPasswordValid = await bcrypt.compare(req.body.password, user._doc.passwordHash)
            if (!isPasswordValid) {
                return res.status(404).json({status: 'client error'})
            }
            
            let token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name
                },
                config.jwtToken,
                { expiresIn: '30d' }
            )

            let { passwordHash, ...userData } = user._doc
            
            res.json({
                status: 'succsess',
                token: token,
                user: userData
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })

    app.get('/auth/me', authCheck, async (req, res) => {
        try {
            let { passwordHash, ...userData } = user._doc
            res.json({
                status: 'succsess',
                tokenData: req.userTokenData,
                user: userData
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })

    console.log('      auth')
}