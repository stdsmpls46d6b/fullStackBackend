import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'

import config from './app/config.js'
import routes from './app/routes/routes.js'

mongoose
    .connect(config.db.url)
    .then(() => {console.log('[ + ] db')})
    .catch(() => {console.log('[ - ] db')})

const app = express()

app.use(express.json())
app.use(cors())
app.use('/med', express.static('med'))


routes(app)

app.listen(config.server.port, config.server.host, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log(`[ + ] server > ${config.server.host}:${config.server.port}`)
})
