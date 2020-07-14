const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "username is required",
    unique: "Username already exists",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: "password is required",
  },
  mobile: {
    type: String,
    trim: true,
    // required: "Mobile number is required",
  },
  profession: {
    type: String,
    trim: true,
  },
  intention:{
    type: String,
  },
  userCreated: {
    type: Date,
    default: new Date(),
  },
  likes: { type: Array },
  dislikes: { type: Array },
  zipCode: { type: Number, trim: true },
  orgsCreated: [{ type: mongoose.Schema.ObjectId, ref: "Created" }],
});
module.exports = mongoose.model("User", UserSchema);