const deviceModel = require("../models/devices.js");

exports.light = async (req, res) => {
  try {
    const light = req.query.light;
    const date = new Date();
    const offsetInMinutes = +420;
    const local = new Date(date.getTime() + offsetInMinutes * 60000);

    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const lightData = data.light[light];
    const lastStatus = lightData[lightData.length - 1];
    if (!lastStatus.status) {
      const updateData = {
        status: true,
        date: local,
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

exports.getLight = async (req, res) => {
  try {
    const data = await deviceModel.findOne({ idDevice: req.query.id });
    const light = data.light;

    const result = {};
    for (const color in light) {
      if (light[color].length > 0) {
        result[color] = light[color][light[color].length - 1];
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
