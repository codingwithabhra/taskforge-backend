const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
 name: { 
    type: String, 
    required: true 
}, // User's name
 email: { 
    type: String, 
    required: true, 
    unique: true 
}, // Email must be unique
 password: {
    type: String,
    required: true,
    minlength: [7, "Password must be at least 7 characters long"],
    maxlength: [15, "Password cannot exceed 15 characters"],
}
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;