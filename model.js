const mongoose = require("mongoose");

const data = new mongoose.Schema({
  data: {
    type: String,
  },
});

module.exports = mongoose.model("data", data);
