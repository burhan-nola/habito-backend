const express = require("express");
const logStatus = require("./controllers/logStatus.js");
const lightStatus = require("./controllers/lightStatus.js");

const router = express.Router();

router.get("/try", logStatus.try);
router.get("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.get("/register", logStatus.register);
router.get("/cek", logStatus.cekStatus);
router.get("/keep-online", logStatus.alwaysOnline);

//light status
router.get("/red", lightStatus.redLight);
module.exports = router;
