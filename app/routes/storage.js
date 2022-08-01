import config from '../config.js'

import authCheck from '../utils/authCheck.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_, __, f) => {
        f(null, 'med')
    },
    filename: (_, file, f) => {
        f(null, file.originalname)
    }
})

const upload = multer({ storage })

export default (app) => {
    app.post('/upload', authCheck, upload.single('image'), (req, res) => {
        res.json({
            status: 'succsess',
            url: `/med/${req.file.originalname}`
        })
    })

    console.log('      stortage')
}
