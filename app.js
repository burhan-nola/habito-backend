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

app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Mengirim data secara berkala ke klien
  const interval = setInterval(async () => {
    const data = { message: 'Pesan baru' };
    res.write(`data: ${JSON.stringify(data)}\n\n`);

    // Simpan data ke MongoDB setiap kali mengirim pembaruan
    try {
      await deviceModel.findOneAndUpdate(
{idDevice:"habito_001"},
{$set:{status: false}},
{new:true}
);
      console.log('Data berhasil disimpan ke MongoDB');
    } catch (error) {
      console.error('Gagal menyimpan data ke MongoDB:', error);
    }
  }, 10000);

  // Tangani penutupan koneksi
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Service is online on port ${port}`);
});
