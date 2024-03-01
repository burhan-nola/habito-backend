const deviceModel = require("../models/devices.js");

exports.redLight = async (req, res) => {
  try {
    const date = new Date();
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light.red;
    const lastStatus = lightData[lightData.length - 1];
    if (!lastStatus.status) {
      const updateData = {
        status: true,
        date: date,
      };

      lightData.push(updateData);
      await data.save();
      return res
        .status(201)
        .json({ mesage: "red light is on", data: lightData });
    }
    res.status(200).json({ mesage: "Task is done" });
  } catch (error) {
    res.status(500).json(error);
  }
};