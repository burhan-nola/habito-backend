const mongoose = require("mongoose");

const data = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("data", data);
