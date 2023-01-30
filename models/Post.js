const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  text: {
    type: String,
    max: 255,
  },
  datetime: {
    type: Date,
    required: false,
    default: Date.now,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", schema);
