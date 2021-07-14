const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

const User = require('../models/Users');


router.post('', async (req, res, next) => {

    console.log('Entered');
    await upload(req, res);
    console.log(req.files);
    const url = req.protocol + '://' + req.get('host');
    console.log(req.files[0].filename);
    const imageUrl = url+ '/ProfileImage/' + req.files[0].filename
    const user = new User({
        firstName: req.body.first_name,
        lastName:  req.body.last_name,
        email : req.body.emailId,
        phoneNumber: req.body.phone_number,
        profilePicture: imageUrl
    }) 
    user.save()
        .then((document) => {
            res.status(200)
                .json({
                    message: 'New User Created Successfully',
                    result: document
                })
        })
});


router.get('', (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(200)
                .json({
                    message: 'All Users Fetched',
                    result: users
                });
        });
});


router.delete('/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id})
        .then((documents) => {
            res.status(200)
                .json({
                    message: 'User deleted Successfully',
                    result: documents
                })
        });
});


router.post('/:id/update', (req, res, next) => {
    console.log('Entered into Update');
    User.updateMany({_id: req.body.id},
        {$set: {
          'firstName': req.body.firstName,
          'lastName': req.body.lastName,
          'email': req.body.email,
          'phoneNumber': req.body.phoneNumber,
        }}).then((result) => {
          
          res.status(200)
          .json({
            message: 'Updated Successfully',
            result: result
          });
    
        })
})
module.exports = router;