require("dotenv").config();
const model = require("./model.js");

exports.try = async (req, res) => {
  try {
    res.status(200).json({ message: "hello" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const saveData = new model(data);
    await saveData.save();
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
};
