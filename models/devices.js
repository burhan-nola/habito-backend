const mongoose = require("mongoose");

const log = new mongoose.Schema({
  status: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

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
    default: new Date(),
  },
  dateRegister: {
    type: Date,
    default: new Date(),
  },
  logs: [log],
});

module.exports = mongoose.model("device", device);
