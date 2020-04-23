const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth")

//@route   GET api/contacts
//@desc    Get all users' contacts
//@access  Private
const User = require("../models/User");
const Contact = require("../models/Contacts");


router.get('/', auth, async (req, res) => {
try {
    const contacts = await Contact.find({user:req.user.id}).sort({date: -1});
    return res.json(contacts)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Error Occured, no token')
}});

//@route   POST api/contacts
//@desc    Add new contact
//@access  Private

router.post('/', (req, res) => {
    res.send('Add contact')
});

//@route   PUT api/contacts/:id
//@desc    Update contact
//@access  Private

router.put('/:id', (req, res) => {
    res.send('Update Contact')
});

//@route   DELETE api/contacts/:id
//@desc    Delete contact
//@access  Private

router.delete('/:id', (req, res) => {
    res.send('Delete Contact')
});



module.exports = router;