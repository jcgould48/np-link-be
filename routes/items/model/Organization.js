const mongoose = require("mongoose");
const moment = require("moment");

const ItemSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: "Item name is required",
  },
  size: {
    type: Number,
    required: "Rent amount is required",
  },
  pitch: {
    type: String,
    required: "Description is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  helpNeeded: {
    type: String,
  },
  dateInput: {
    type: Date,
  },
  nonprofitStatus: {
    type: Boolean,
    
  },
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
