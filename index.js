import express from 'express'
import mongoose from 'mongoose'

import config from './app/config.js'
import routes from './app/routes/routes.js'

mongoose
    .connect(config.db.url)
    .then(() => {console.log('[ + ] db')})
    .catch(() => {console.log('[ - ] db')})
const app = express()
app.use(express.json())


routes(app)

app.listen(8080, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('[ + ] server : 8080')
})
