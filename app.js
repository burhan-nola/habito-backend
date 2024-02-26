const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const mongoose = require("mongoose");

const deviceModel = require("./models/devices.js");
const logsModel = require("./models/logs.js");
const { toLocalDate } = require("./functions/toLocalDate.js");

require("dotenv").config();
const router = require("./router");

const app = express();

const port = process.env["PORT"];
const mongoString = process.env["DATABASE_URL"];

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());

app.use("/", router);

let a = 0;
cron.schedule("*/20 * * * * *", async () => {
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
});

app.listen(port, () => {
  console.log(`Service is online on port ${port}`);
});
