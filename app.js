const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const deviceModel = require("./models/devices.js");

require("dotenv").config();
const router = require("./router");

const app = express();

const port = 5000;
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

app.listen(port, () => {
  console.log(`Service is online on port ${port}`);
});

const isOnline =async()=>{
setInterval(() => {
    // Lakukan pemeriksaan status perangkat di sini
    // Jika perangkat dianggap offline, ubah nilai status di MongoDB
    // Misalnya, menggunakan logika ping atau heartbeat
const id = "habito_001";
const off = await modelDevice.findOneAndUpdate(
{idDevice: id},
{$set{status:false}},
{new: true}
)
  }, 10000);
}

isOnline();
