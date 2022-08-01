import config from '../config.js'

import postModel from '../modeles/posts.js'
import { postCreateValidation, postPatchValidation } from '../validations.js'
import authCheck from '../utils/authCheck.js'
import validate from '../utils/validationErrorsHandle.js'


export default (app) => {
    app.post('/posts', postCreateValidation, validate, authCheck, async (req, res) => {
        try {
    
            let doc = new postModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            })

            let post = await doc.save()
    
            res.json({
                // ... user
                status: 'succsess',
                post: post
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })

    app.get('/posts', async (req, res) => {
        try {
            let posts = await postModel.find().populate({
                path: 'user',
                select: '_id name avatarUrl',
            }).exec()
    
            res.json({
                // ... user
                status: 'succsess',
                posts: posts
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })

    app.get('/posts/:id', async (req, res) => {
        try {
            let postId = req.params.id

            postModel.findOneAndUpdate(
                { _id: postId },
                { $inc: { viewsCount: 1 } },
                { returnDocument: 'after' },
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({status: 'server error'})
                    }

                    if (!doc) {
                        return res.status(404).json({status: 'client error', message: 'post not found'})
                    }

                    res.json({
                        status: 'succsess',
                        post: doc
                    })
                }
            )
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })



    app.delete('/posts/:id', authCheck, async (req, res) => {
        try {
            let postId = req.params.id

            postModel.findOneAndDelete(
                { _id: postId },
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({status: 'server error'})
                    }

                    if (!doc) {
                        return res.status(404).json({status: 'client error', message: 'post not found'})
                    }

                    res.json({
                        status: 'succsess'
                    })
                }
            )
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })

    app.patch('/posts/:id', postPatchValidation, validate, authCheck, async (req, res) => {
        try {
            let postId = req.params.id

            postModel.findOneAndUpdate(
                { _id: postId },
                {
                    title: req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    tags: req.body.tags,
                    user: req.userId,
                },
                { returnDocument: 'after' },
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({status: 'server error'})
                    }

                    if (!doc) {
                        return res.status(404).json({status: 'client error', message: 'post not found'})
                    }

                    res.json({
                        status: 'succsess',
                        post: doc
                    })
                }
            )
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })


    

    console.log('      post')
}