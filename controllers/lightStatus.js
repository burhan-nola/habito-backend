const deviceModel = require("../models/devices.js");

exports.light = async (req, res) => {
  try {
    const light = req.query.light;
    const date = new Date();
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light[light];
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
        .json({ message: `${light} light is on`, data: updateData });
    }
    res.status(200).json({ message: "Task is done" });
  } catch (error) {
    res.status(500).json(error);
  }
};
