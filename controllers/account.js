const jwt = require("jsonwebtoken");
const accountModel = require("../models/accounts.js");
const deviceModel = require("../models/devices.js");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const cek = await accountModel.findOne({ deviceID: req.body.deviceID });
    if (cek) {
      return res.status(401).json({ message: "user sudah terdaftar" });
    }
    const data = new accountModel(req.body);
    await data.save();
    res.status(201).json({ message: "user registered", data });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { deviceID, password } = req.body;
    const data = await accountModel.findOne({ deviceID: deviceID });
    // const cekPassword = await data.findOne({ password: password });
    if (!data || data.password != password) {
      return res
        .status(400)
        .json({ message: "user dosen't exist or wrong password" });
    }
    const token = jwt.sign({ id: data._id }, process.env["KEY"], {
      expiresIn: "24h",
    });
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
    res
      .status(200)
      .json({ message: "Login berhasil", deviceID: data.deviceID, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userDeviceData = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const user = await accountModel.findOne({ deviceID: req.query.id });
    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }
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
    res.status(200).json(sendData);
  } catch (error) {
    res.status(500).json(error);
  }
};
