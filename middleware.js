const deviceModel = require("./models/devices.js");
const { toLocalDate } = require("./functions/toLocalDate.js");

const cekStatus = (req, res, next) => {
  try {
    const offline = async () => {
      const localDate = toLocalDate();
      const updateData = await deviceModel.findOneAndUpdate(
        { idDevice: "habito_001" },
        { $set: { status: false } },
        { new: true }
      );
      const saveUpdate = {
        idDevice: "habito_001",
        status: false,
        date: localDate,
      };
      const logStatus = new logsModel(saveUpdate);
      await logStatus.save();
    };
    setTimeout(() => {
      offline();
    }, 20000);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = cekStatus;
