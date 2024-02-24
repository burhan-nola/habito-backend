const mongoose = require("mongoose");

const log = new mongoose.Schema({
  idDevice: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("log", log);
