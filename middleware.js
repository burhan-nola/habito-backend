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
    timeoutId = setTimeout(() => {
      offline();
    }, 5000);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

const myMiddleware = (req, res, next) => {
  // Lakukan sesuatu setiap 5 detik
  const intervalId = setInterval(() => {
    console.log("Middleware is running every 5 seconds");
    // Lakukan sesuatu di sini sesuai kebutuhan
  }, 5000);

  // Jika Anda ingin berhenti setInterval setelah beberapa saat
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval stopped after 30 seconds");
  }, 30000);

  // Lanjutkan ke middleware berikutnya
  next();
};

module.exports = { cekStatus, myMiddleware };
