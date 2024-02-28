const logsModel = require("./models/logs.js");
const deviceModel = require("./models/devices.js");
const { toLocalDate } = require("./functions/toLocalDate.js");

let timeoutId;
const cekStatus = (req, res, next) => {
  try {
    const offline = async () => {
      const localDate = toLocalDate();
      const updateData = await deviceModel.findOneAndUpdate(
        { idDevice: "habito_001" },
        { $set: { status: false, lastUpdate: localDate } },
        { new: true }
      );
      const saveUpdate = {
        idDevice: "habito_001",
        status: false,
        date: localDate,
      };
      const logStatus = new logsModel(saveUpdate);
      await logStatus.save();
      console.log("device offline");
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      await offline();
    }, 10000);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { cekStatus };
