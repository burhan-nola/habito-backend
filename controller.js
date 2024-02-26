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

exports.register = async (req, res) => {
  try {
    const localDate = toLocalDate();
    const idDevice = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: idDevice });
    if (cekID) {
      return res.status(400).json({ message: "Device already registered" });
    }
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

exports.logs = async (req, res) => {
  try {
    const localDate = toLocalDate();
    const id = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: id });
    if (!cekID) {
      return res.status(400).json({ error: "id not found" });
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: true } },
      { new: true }
    );
    const saveUpdate = {
      idDevice: id,
      status: true,
      date: localDate,
    };
    const logStatus = new logsModel(saveUpdate);
    await logStatus.save();

    setInterval(async () => {
      const updateData = await deviceModel.findOneAndUpdate(
        { idDevice: id },
        { $set: { status: false } },
        { new: true }
      );
      const saveUpdate = {
        idDevice: id,
        status: false,
        date: localDate,
      };
      const logStatus = new logsModel(saveUpdate);
      await logStatus.save();
    }, 20000);

    res.status(200).json({ message: "Device online now" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.offline = async (req, res) => {
  try {
    const localDate = toLocalDate();
    const id = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: id });
    if (!cekID) {
      return res.status(400).json({ error: "id not found" });
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: false } },
      { new: true }
    );
    const saveUpdate = {
      idDevice: id,
      status: false,
      date: localDate,
    };
    const logStatus = new logsModel(saveUpdate);
    await logStatus.save();
    res.status(200).send("Device offline");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.cekStatus = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    res.status(200).json({ message: data.status });
  } catch (error) {
    res.status(500).json(error);
  }
};
