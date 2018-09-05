const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema);

module.exports = User;