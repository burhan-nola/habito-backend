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

const light = new mongoose.Schema({
  red: [log],
  green: [log],
  blue: [log],
  yellow: [log],
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
  light: light,
});

module.exports = mongoose.model("device", device);
