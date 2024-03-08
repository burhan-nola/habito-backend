const express = require("express");
const logStatus = require("./controllers/logStatus.js");
const lightStatus = require("./controllers/lightStatus.js");
const account = require("./controllers/account.js");

const router = express.Router();

router.get("/try", logStatus.try);
router.get("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.get("/register", logStatus.register);
router.get("/cek", logStatus.cekStatus);
router.get("/keep-online", logStatus.alwaysOnline);

//light status
router.get("/light", lightStatus.light);

//web
router.post("/register-user", account.register);
router.post("/login", account.login);
router.get("/user-device", account.userDeviceData);

module.exports = router;
