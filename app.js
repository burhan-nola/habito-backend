const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

let online = true;
app.get("/online", (req, res) => {
  // Mengatur status online menjadi true ketika ada permintaan
  online = true;
  res.send("API is online");
});

// Middleware untuk menangani setiap permintaan dan mengatur status online menjadi false setelah 20 detik tanpa permintaan
app.use((req, res, next) => {
  setTimeout(() => {
    online = false;
  }, 20000);
  next();
});

// Endpoint untuk mendapatkan status online/offline
app.get("/status", (req, res) => {
  if (online) {
    res.send("API is online");
  } else {
    res.send("API is offline");
  }
});

app.listen(port, () => {
  console.log(`Service is online on port ${port}`);
});
