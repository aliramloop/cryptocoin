const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number },
    username: { type: String , required: true },
    email: { type: String , required: true },
    password: { type: String , required: true },
    UUID: { type: String , required: true }
});

module.exports = mongoose.model('User' , userSchema , 'User');