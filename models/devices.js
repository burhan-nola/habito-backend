const mongoose = require("mongoose");

const log = new mongoose.Schema({
  status: {
    type: Boolean,
    defalut: false,
  },
  ipAddress: {
    type: String,
  },
  SSID: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const lightStatus = new mongoose.Schema({
  status: {
    type: Boolean,
    defalut: false,
  },
  date: {
    type: Date,
  },
});
const light = new mongoose.Schema({
  red: [lightStatus],
  green: [lightStatus],
  blue: [lightStatus],
  yellow: [lightStatus],
});

const device = new mongoose.Schema({
  idDevice: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  owner: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: false,
  },
  lastUpdate: {
    type: Date,
  },
  dateRegister: {
    type: Date,
  },
  logs: [log],
  light: light,
});

module.exports = mongoose.model("device", device);
