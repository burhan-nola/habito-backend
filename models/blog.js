const mongoose = require("mongoose");

const blog = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  dateCreated: {
    type: Date(),
    require: true,
  },
  dateModified: {
    type: Date(),
    require: true,
  },
});

module.exports = mongoose.model("blog", blog);
