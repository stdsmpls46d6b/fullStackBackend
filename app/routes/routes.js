import auth from './auth.js'
import post from './post.js'

export default (app) => {
    auth(app)
    post(app)
    
    console.log('[ + ] routes')
}