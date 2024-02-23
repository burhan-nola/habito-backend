const mongoose = require("mongoose");

const data = new mongoose.Schema({
  data: {
    type: String,
  },
  dateCreated: {
    type: Date,
  },
});

module.exports = mongoose.model("data", data);
