const mongoose = require("mongoose");

const log = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
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
    default: false,
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

const detailLight = new mongoose.Schema({
  red: {
    type: String,
    default: "",
  },
  green: {
    type: String,
    default: "",
  },
  blue: {
    type: String,
    default: "",
  },
  yellow: {
    type: String,
    default: "",
  },
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
  detailLight: detailLight,
});

module.exports = mongoose.model("device", device);
