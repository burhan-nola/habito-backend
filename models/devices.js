const mongoose = require("mongoose");

const light = new mongoose.Schema({
  red: [
    {
      status: Boolean,
      timeStamp: Date,
    },
  ],
  green: [
    {
      status: Boolean,
      timeStamp: Date,
    },
  ],
  blue: [
    {
      status: Boolean,
      timeStamp: Date,
    },
  ],
  yellow: [
    {
      status: Boolean,
      timeStamp: Date,
    },
  ],
});

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
  light: light,
});

module.exports = mongoose.model("device", device);
