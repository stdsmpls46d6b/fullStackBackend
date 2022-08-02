import config from '../config.js'

import postModel from '../modeles/posts.js'
import { postCreateValidation, postPatchValidation } from '../validations.js'
import authCheck from '../utils/authCheck.js'
import validate from '../utils/validationErrorsHandle.js'

let uniq = (value, index, self) => { 
    return self.indexOf(value) == index;
}

export default (app) => {
    app.get('/tags/last', async (req, res) => {
        try {
            let posts = await postModel.find().limit(5).exec()

            let tags = posts.map(obj => obj.tags).flat().filter(uniq).slice(0, 5)
    
            res.json({
                // ... user
                status: 'succsess',
                tags: tags
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({status: 'server error'})
        }
    })
    console.log('      tags')
}