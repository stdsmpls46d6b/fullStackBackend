import auth from './auth.js'

export default (app) => {
    auth(app)
    
    console.log('[ + ] routes')
}