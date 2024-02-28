const mongoose = require("mongoose");

const device = new mongoose.Schema({
  idDevice: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
  },
  lastUpdate: {
    type: Date,
    default: Date(),
  },
  dateRegister: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model("device", device);
