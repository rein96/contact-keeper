const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

// From User.js and Contact.js (models)
// mongoose.Schema
const User = require('../models/User')
const Contact = require('../models/Contact')    



// Get all users contacts (postman)
// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all contacts !');
    // Private -> auth middleware

    try {
        const contacts = await Contact.find( { user:req.user.id } ).sort({ date: -1 })  //sort by date -1 -> most recent contact first
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error get contacts')
    }
});




// Add contact (postman)
// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [ auth, [      //second parameter auth and express-validator
    check('name', 'Name is required').not().isEmpty()   //the only required field = name
]], async (req, res) => {
    // res.send('Add contact !');
    // Private -> auth middleware

     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         return res.status(400).json( { errors: errors.array() } )
     }


     const {name, phone, email, type} = req.body;
     try {
         const newContact = new Contact({   //Contact.js model
            name,
            email,
            phone,
            type,
            user: req.user.id
         });

         const contact = await newContact.save()    //save() -> save to database

         res.json(contact);     //return contact to the client

     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error POST new contact')
     }

});





// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {    //auth = access users and token
    // res.send('Update contact !');

    const {name, phone, email, type} = req.body;

    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;     // if there's name -> add to contactFields.name
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);    //req.params.id = '/:id'

        // if not contact = (not found)
        if(!contact) return res.status(404).json( { msg: 'Contact not found' } );

        // Make sure user owns specific contacts
        if(contact.user.toString() !== req.user.id) {   // req.user.id = String     // contact.user not equal user token
            return res.status(401).json( { msg: 'Not authorized' } );
        }

        // if contact.user === user.id (token)
        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set : contactFields },
            { new : true }      // if this contact doesn't exist, then CREATE NEW ONE
        );

        res.json(contact);

    } catch (err) {
        console.error(err.message);
         res.status(500).send('Server error PUT edit contact')
    }
    
});



// Delete contact (postman)
// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete contact !');
    try {
        let contact = await Contact.findById(req.params.id);    //req.params.id = '/:id'

        // if not contact = (not found)
        if(!contact) return res.status(404).json( { msg: 'Contact not found' } );

        // Make sure user owns specific contacts
        if(contact.user.toString() !== req.user.id) {   // req.user.id = String     // contact.user not equal user token
            return res.status(401).json( { msg: 'Not authorized' } );
        }

        await Contact.findByIdAndRemove(req.params.id);
        
        res.json( { msg: 'Contact removed !' } );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error DELETE contact')
    }
});


module.exports = router;