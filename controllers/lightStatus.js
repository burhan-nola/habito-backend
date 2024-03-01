const deviceModel = require("../models/devices.js");

exports.redLight = async (req, res) => {
  try {
    const date = new Date();
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light.red;
    const lastStatus = lightData[lightData.length - 1];
    if (lastStatus.status) {
      return res.status(200).json({ message: "task is done" });
    }

    const updateData = {
      staus: true,
      date: date,
    };

    lightData.push(updateData);
    await data.save();

    res.status(201).json({ mesage: "red light is on", data: lightData });
  } catch (error) {
    res.status(500).json(error);
  }
};
