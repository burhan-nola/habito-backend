const mongoose = require("mongoose");

const device = new mongoose.Schema({
  idDevice: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dateRegister: {
    type: Date,
  },
});

module.exports = mongoose.model("device", device);
