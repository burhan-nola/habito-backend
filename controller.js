require("dotenv").config();
const logsModel = require("./models/logs.js");
const deviceModel = require("./models/devices.js");
const { toLocalDate } = require("./functions/toLocalDate.js");

exports.try = async (req, res) => {
  try {
    console.log("permintaan berhasil");
    res.status(200).json([{ message: "hai" }]);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.newPost = async (req, res) => {
//   try {
//     const localDate = toLocalDate();

//     const data = req.query.data;
//     const newData = new model({ data: data, dateCreated: localDate });
//     await newData.save();
//     res.status(201).json({ message: "Data berhasil disimpan", save: newData });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.logs = async (req, res) => {
  try {
    const id = req.query.id;
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: true } },
      { new: true }
    );
    res.status(200).json({ message: "data updated", status: "online" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.register = async (req, res) => {
  try {
    const localDate = toLocalDate();
    const idDevice = req.query.id;
    const data = {
      idDevice: idDevice,
      status: false,
      dateRegister: localDate,
    };
    const save = new deviceModel(data);
    await save.save();
    res.status(200).json({ message: "device registered", data });
  } catch (error) {
    res.status(500).json(error);
  }
};
