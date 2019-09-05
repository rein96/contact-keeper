const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth')  //middleware next()

const { check, validationResult } = require('express-validator');

// From User.js
const User = require('../models/User')  //Mongoose

const router = express.Router();


// Get logged in user (postman)
// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    // res.send('Get loggged in user !');
    // Private -> middleware

    // get token -> find Mongoose(User) by ID (req.user.id)  without password -> jsonformat -> (user) 
    try {
        // req.user = decoded.user;     next();
        const user = await User.findById(req.user.id).select('-password');  //select without password
        res.json(user);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


// Login User (Auth)  (postman)
// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    // validation
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
], 
async (req, res) => {
    // If there is error on checking req
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    }

    // If not error
    const { email, password } = req.body;

    try {
        let user = await User.findOne( { email : email } );

        // if there is no user with that email
        if(!user) {
            return res.status(400).json( {msg: 'Invalid Credentials :('} )
        }

        // if there is a user or email (SUCCESS)
        const isMatch = await bcrypt.compare(password, user.password)  //password = input | user.password = database

        if(!isMatch) {
            return res.status(400).json( { msg: 'Invalid Credentials :(' } )
        }

        // if isMatch === true
        const payload = {
            user: {
                id : user.id    // we only need the id to access the user
            }
        }

        // jwtSecret is declared on default.json ("secret")
        jwt.sign( payload, config.get('jwtSecret'), { 
            expiresIn: 360000    //3600 sec = 1 hour
        }, (err, token) => {
            if(err) throw err;
            // if not error, pass the token (response can be seen on postman)
            res.json({ token }); 
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;