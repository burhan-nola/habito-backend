require("dotenv").config();
const model = require("./model.js");

exports.try = async (req, res) => {
  try {
    console.log("permintaan berhasil");
    res.status(200).json([{ message: "hai" }]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postData = async (req, res) => {
  try {
    const data = req.query.param1;
    const dataJson = {
      data: data,
    };
    const saveData = new model(dataJson);
    await saveData.save();
    console.log(data);
    res.status(201).json(saveData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.newPost = async (req, res) => {
  try {
    const { data } = req.body;
    const newData = new model({ data });
    await newData.save();
    res.status(201).json({ message: "Data berhasil disimpan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
