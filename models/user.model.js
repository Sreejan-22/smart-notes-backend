const mongoose = require("mongoose");
const { isEmail } = require("validator");

function validatePassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g.test(
    value
  );
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    trim: true,
    validate: [
      validatePassword,
      "Password must be at least 8 characters long(at least one lowercase letter, one uppercase letter, one digit and one special character)",
    ],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
