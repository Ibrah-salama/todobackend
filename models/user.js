const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must has name!"],
    minLength: [3, "A user name must be more or equal 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "A user must has name!"],
    minLength: [3, "A user name must be more or equal 3 characters"],
  },
  userName: {
    type: String,
    required: [true, "A user must has user-name!"],
    lowercase: true,
    unique: true,
    maxLength: [40, "A user name must be less or equal 40 character"],
    minLength: [3, "A user name must be more or equal 10 characters"],
  },
  email: {
    type: String,
    required: [true, "A user must has email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide us a valid email"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "The user must has gender!"],
  },
  password: {
    type: String,
    minLength: [8, "The password length should be 8 characters"],
    required: [true, "A user must has password!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must confirm his password!"],
  },
});

userSchema.pre("save", async function (next) {
  console.log(this)
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
