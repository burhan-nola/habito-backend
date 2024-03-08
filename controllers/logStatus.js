require("dotenv").config();
const deviceModel = require("../models/devices.js");
const accountModel = require("../models/accounts.js");

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
    const idDevice = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: idDevice });
    if (cekID) {
      return res.status(400).json({ message: "Device already registered" });
    }
    const lightStatus = {
      status: false,
    };
    const data = {
      idDevice: idDevice,
      status: false,
      light: {
        red: lightStatus,
        green: lightStatus,
        blue: lightStatus,
        yellow: lightStatus,
      },
    };
    const save = new deviceModel(data);
    await save.save();
    res.status(200).json({ message: "device registered", save });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.logs = async (req, res) => {
  try {
    const id = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: id });
    if (!cekID) {
      return res.status(400).json({ error: "id not found" });
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: true, lastUpdate: new Date() } },
      { new: true }
    );
    const logData = {
      status: true,
      date: updateData.lastUpdate,
    };
    cekID.logs.push(logData);
    await cekID.save();

    res
      .status(200)
      .json({ message: "Device online now", date: updateData.lastUpdate });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.offline = async (req, res) => {
  try {
    const id = req.query.id;
    const cekID = await deviceModel.findOne({ idDevice: id });
    if (!cekID) {
      return res.status(400).json({ error: "id not found" });
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: false, lastUpdate: new Date() } },
      { new: true }
    );
    const logData = {
      status: false,
      date: updateData.lastUpdate,
    };
    cekID.logs.push(logData);
    await cekID.save();
    res.status(200).json({ message: "Device offline", date: logStatus.date });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.cekStatus = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const user = await accountModel.findOne({ idDevice: req.query.id });

    const lastUpdate = data.lastUpdate;
    const thisTime = new Date();
    const elapseTime = thisTime - lastUpdate;
    const second = Math.round(elapseTime / 1000);

    const sendData = {
      deviceID: data.idDevice,
      owner: user.owner,
      status: data.status,
      lastUpdate: data.lastUpdate,
      light: {
        red: data.light.red[data.light.red.length - 1],
        green: data.light.green[data.light.green.length - 1],
        blue: data.light.blue[data.light.blue.length - 1],
        yellow: data.light.yellow[data.light.yellow.length - 1],
      },
    };

    if (!data.status) {
      return res.status(200).json(sendData);
    }

    if (second > 5) {
      const updateData = await deviceModel.findOneAndUpdate(
        { idDevice: req.query.id },
        { $set: { status: false, lastUpdate: thisTime - elapseTime } },
        { new: true }
      );
      const logData = {
        status: false,
        date: updateData.lastUpdate,
      };
      data.logs.push(logData);
      await data.save();
      console.log(elapseTime);
      sendData.status = false;
      return res.status(200).json(sendData);
    }
    res.status(200).json(sendData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.alwaysOnline = async (req, res) => {
  try {
    const date = new Date();
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lastStatus = data.logs[data.logs.length - 1].status;
    if (!lastStatus) {
      const logData = {
        status: true,
        date: date,
      };
      data.logs.push(logData);
      await data.save();
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: req.query.id },
      { $set: { status: true, lastUpdate: date } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: updateData.status, lastStatus: lastStatus });
  } catch (error) {
    res.status(500).json(error);
  }
};
