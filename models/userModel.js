let mongoose = require('mongoose');
let JWT = require('jsonwebtoken');


let userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact_number: { type: Number, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    roles: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { versionKey: false })

userSchema.methods.getJwtToken = function () {
    return JWT.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

module.exports = mongoose.model('Users', userSchema)