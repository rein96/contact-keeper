const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

// From User.js
const User = require('../models/User')

// Register user (postman)
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength( { min:6 } )
] ,
    async (req, res) => {
        // res.send(req.body);
        const errors = validationResult(req);
        // if not errors is empty = error !
        if(!errors.isEmpty()) {
            return res.status(400).json( { errors: errors.array() } );
        }

        // // if name, email, and password is fulfilled, then passed !
        // res.send('passed !');
        const { name, email, password } = req.body;     //inputed by user

        try {
            // User = model findOne on database
            let user = await User.findOne({ email: email });

            // if user (email) is already existed
            if(user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // If user or email can be used
            user = new User({
                name,
                email,
                password    //password is not encrypted yet here
            });  // User from models

            // encrypt password before store do database
            const salt = await bcrypt.genSalt(10);  // 10 = default
            
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // res.send('User saved successfully !');
            const payload = {
                user: {
                    id : user.id    // we only need the id to access the user
                }
            }

            // jwtSecret is declared on default.json ("secret")
            jwt.sign( payload, config.get('jwtSecret'), { 
                expiresIn: 360000    //3600 sec = 1 hour    //360000 = longer is better for development
            }, (err, token) => {
                if(err) throw err;
                // if not error, pass the token (response (res) can be seen on postman)
                res.json({ token }); 
            })



        } catch (err) {
            console.error(err.message);
            // 500 = server error
            res.status(500).send('Server Error');
        }

});

module.exports = router;