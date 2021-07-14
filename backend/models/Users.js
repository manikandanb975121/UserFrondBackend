const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const user = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName:  { type: String, required: true},
    email : { type: String, required: true, unique: true},
    phoneNumber: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true}
});

user.plugin(uniqueValidator);
module.exports = mongoose.model('User', user);