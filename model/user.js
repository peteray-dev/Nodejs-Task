const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'a user must provide a valid username'],
        unique: [true, "username already exist"]
    },
    password:{
        type: String,
        required: [true, "please input a password"],
        min: 6,
        max: 15
    }
    // token:{
    //     type: String,
    //     required: true
    // }
})

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
