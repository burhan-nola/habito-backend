require("dotenv").config();
const logsModel = require("./models/logs.js");
const deviceModel = require("./models/devices.js");
const { toLocalDate } = require("./functions/toLocalDate.js");
const localDate = toLocalDate();

exports.try = async (req, res) => {
  try {
    console.log("permintaan berhasil");
    res.status(200).json([{ message: "hai" }]);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
      lastUpdate: localDate,
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
      { $set: { status: true, lastUpdate: localDate } },
      { new: true }
    );
    const saveUpdate = {
      idDevice: id,
      status: true,
      date: localDate,
    };
    const logStatus = new logsModel(saveUpdate);
    await logStatus.save();

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
    const lastUpdate = data.lastUpdate.getTime();
    res.status(200).json({ message: data.status, lastUpdate: lastUpdate });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.alwaysOnline = async (req, res) => {
  try {
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: req.query.id },
      { $set: { status: true, lastUpdate: localDate } },
      { new: true }
    );

    res.status(200).json({ message: updateData.status });
  } catch (error) {
    res.status(500).json(error);
  }
};
