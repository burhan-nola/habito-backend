const mongoose = require("mongoose");

const account = new mongoose.Schema({
  deviceID: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  owner: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("account", account);
