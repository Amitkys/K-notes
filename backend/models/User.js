const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: String,
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    email_verified: Boolean,
    provider: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
