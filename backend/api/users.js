const express = require('express');
const router = express.Router()

const User = require('../models/User');

router.get('/', (req, res) => {
    User.find()
        .then(users => {
          console.log('I FOUnd Users: ', users);
          return res.json(users)
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const { username, email } = req.body;
    console.log("NAME: ", req.body);
    console.log("====================")
    console.log(req.body.username)
    const newUser = new User({
        name: username, 
        email: email
    })
    console.log('New User: ', newUser);
    newUser.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => {
          console.log(err); 
          return res.status(400).json({
            "error": err,
            "message": "Error creating account"
          })
        })
})
module.exports = router 