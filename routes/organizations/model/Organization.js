const mongoose = require("mongoose");
const moment = require("moment");

const ItemSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: "Item name is required",
  },
  poc: {
    type: String,
    required: "Item name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    required: "Email is required",
  },
  city: { type: String, trim: true },
  pitch: {
    type: String,
    // required: "Description is required",
  },
  description: {
    type: String,
    // required: "Description is required",
  },
  helpNeeded: {
    type: String,
  },
  dateInput: {
    type: Date,
    default: new Date(),
  },
  approved: {
    type: Boolean,
    
  },
  helpNeeded:{ type: Array, default: [] },
  hashTags: { type: Array, default: [] },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: String,
    default: () => {
      const now = moment();
      return now.format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
  },
});

module.exports = mongoose.model("Item", ItemSchema);
