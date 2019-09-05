// MIDDLEWARE = function that has access to the request and response cycle & object
// to CHECK if there's a TOKEN in the header
const jwt = require('jsonwebtoken');
const config = require('config');     //to access the "secret"


module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');   //request token inside the header with key 'x-auth-token'

    // Check if there is not available token (if it doesn't exist)
    if (!token) {
        // 401 = unauthorized
        return res.status(401).json( { msg: 'No token, authorization denied.' } )
    }

    // if token has been obtained  
    try {
        // Verify the object(payload) -> decoded
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();     //middleware

    } catch (err) {
        res.status(401).json( { msg: 'Token is not valid' } )
        console.error(err);
    }
}