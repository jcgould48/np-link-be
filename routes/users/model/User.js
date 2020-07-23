const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required",
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
  expertise: {
    type: String,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
  userCreated: {
    type: Date,
    default: new Date(),
  },
  city: { type: String, trim: true },
  likes: [],
  dislikes: [{ type: mongoose.Schema.ObjectId, ref: "Dislinkes" }],
  orgsCreated: [{ type: mongoose.Schema.ObjectId, ref: "Created" }],
});
module.exports = mongoose.model("User", UserSchema);