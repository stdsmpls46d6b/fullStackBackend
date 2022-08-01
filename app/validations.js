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

export const postCreateValidation = [
    body('title', 'incorrect title format', '2').isLength({min: 2, max: 64}).isString(),
    body('text', 'incorrect text format').isLength({min: 8, max: 65536}).isString(),
    body('tags', 'incorrect name format').optional().isArray(),
    body('img', 'incorrect img url format').optional().isURL()
]

export const postPatchValidation = [
    body('title', 'incorrect title format', '2').optional().isLength({min: 2, max: 64}).isString(),
    body('text', 'incorrect text format').optional().isLength({min: 8, max: 65536}).isString(),
    body('tags', 'incorrect name format').optional().isArray(),
    body('img', 'incorrect img url format').optional().isURL()
]
