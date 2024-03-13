const jwt = require("jsonwebtoken");
const deviceModel = require("../models/devices.js");

require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    const data = await deviceModel.findOne({ idDevice: id });
    // const cekPassword = await deviceModel.findOne({ password: password });
    if (!data || data.password != password) {
      return res
        .status(400)
        .json({ message: "user dosen't exist or wrong password" });
    }
    const token = jwt.sign({ id: data._id }, process.env["KEY"], {
      expiresIn: "24h",
    });

    res
      .status(200)
      .json({ message: "Login berhasil", idDevice: data.idDevice, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
