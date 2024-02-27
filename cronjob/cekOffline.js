const { toLocalDate } = require("./functions/toLocalDate.js");

const deviceModel = require("./models/devices.js");
const logsModel = require("./models/logs.js");

const cekOffline = async () => {
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
  console.log("semua device offline");
};
