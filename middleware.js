const deviceModel = require("./models/devices.js");

const cekStatus = (req, res, next) => {
  try {
    const offline = async () => {
      const updateData = await deviceModel.findOneAndUpdate(
        { idDevice: "habito_001" },
        { $set: { status: false } },
        { new: true }
      );
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
