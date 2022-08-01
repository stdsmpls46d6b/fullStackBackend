import { body } from 'express-validator'

export const signupValidation = [
    body('email', 'incorrect email format').isEmail(),
    body('password', 'incorrect password length').isLength({min: 8, max: 64}),
    body('name', 'incorrect name length').isLength({min: 3, max: 64}),
    body('avatarUrl', 'incorrect awatar url format').optional().isURL()
]

export const loginValidation = [
    body('email', 'incorrect email format').isEmail(),
    body('password', 'incorrect password length').isLength({min: 8, max: 64})
]
