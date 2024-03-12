const mongoose = require("mongoose");

const log = new mongoose.Schema({
  status: {
    type: Boolean,
  },
  ipAddress: {
    type: String,
  },
  SSID: {
    type: String,
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
  password: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
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
