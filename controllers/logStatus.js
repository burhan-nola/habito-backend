require("dotenv").config();
const deviceModel = require("../models/devices.js");
const accountModel = require("../models/accounts.js");

exports.try = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.body.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.register = async (req, res) => {
  try {
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);

    const data = await deviceModel.findOne({ idDevice: req.body.id });
    if (data) {
      return res.status(400).json({ message: "Device already registered" });
    }
    const lightStatus = {
      date: local,
    };
    const dataSend = {
      idDevice: req.body.id,
      lastUpdate: local,
      dateRegister: local,
      light: {
        red: lightStatus,
        green: lightStatus,
        blue: lightStatus,
        yellow: lightStatus,
      },
      logs: [{ date: local }],
    };
    const save = new deviceModel(dataSend);
    await save.save();
    res.status(200).json({ message: "device registered", save });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.logs = async (req, res) => {
  try {
    const id = req.body.id;
    const cekID = await deviceModel.findOne({ idDevice: id });
    if (!cekID) {
      return res.status(400).json({ error: "id not found" });
    }
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: id },
      { $set: { status: true, lastUpdate: local } },
      { new: true }
    );
    const logData = {
      status: true,
      ipAddress: req.body.ip,
      SSID: req.body.ssid,
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
    const offsetInMinutes = +420;
    const data = await deviceModel.findOne({ idDevice: req.query.id });

    const lastUpdate = data.lastUpdate;
    const date = new Date();
    const thisTime = new Date(date.getTime() + offsetInMinutes * 60000);
    const elapseTime = thisTime - lastUpdate;
    const second = Math.round(elapseTime / 1000);

    const local = new Date(lastUpdate.getTime() + offsetInMinutes * 60000);
    const sendData = {
      idDevice: data.idDevice,
      owner: data.owner,
      status: data.status,
      lastUpdate: lastUpdate,
      logs: data.logs[data.logs.length - 1],
    };

    if (!data.status) {
      return res.status(200).json(sendData);
    }

    if (second > 5) {
      const updateData = await deviceModel
        .findOneAndUpdate(
          { idDevice: req.query.id },
          { $set: { status: false, lastUpdate: thisTime - elapseTime } },
          { new: true }
        )
        .select({ idDevice: 1, status: 1, owner: 1, lastUpdate: 1, logs: 1 });
      const logData = {
        status: false,
        date: updateData.lastUpdate,
      };
      data.logs.push(logData);
      await data.save();
      return res.status(200).json(updateData);
    }
    res.status(200).json(sendData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.alwaysOnline = async (req, res) => {
  try {
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);
    const data = await deviceModel.findOne({ idDevice: req.body.id });
    const lastStatus = data.logs[data.logs.length - 1].status;
    if (!lastStatus) {
      const logData = {
        status: true,
        ipAddress: req.body.ip,
        SSID: req.body.ssid,
        date: local,
      };
      data.logs.push(logData);
      await data.save();
    }
    const updateData = await deviceModel.findOneAndUpdate(
      { idDevice: req.body.id },
      { $set: { status: true, lastUpdate: local } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: updateData.status, lastStatus: lastStatus });
  } catch (error) {
    res.status(500).json(error);
  }
};
