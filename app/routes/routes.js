import auth from './auth.js'
import post from './post.js'
import tags from './tags.js'
import storage from './storage.js'

export default (app) => {
    auth(app)
    post(app)
    tags(app)
    storage(app)
    
    console.log('[ + ] routes')
}