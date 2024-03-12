const express = require("express");
const logStatus = require("./controllers/logStatus.js");
const lightStatus = require("./controllers/lightStatus.js");
const account = require("./controllers/account.js");
const auth = require("./middleware.js");

const router = express.Router();

router.get("/try", logStatus.try);
router.get("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.post("/register", logStatus.register);
router.post("/keep-online", logStatus.alwaysOnline);

//light status
router.get("/light", lightStatus.light);
router.get("/light-status", lightStatus.getLight);

//web
router.post("/register-user", account.register);
router.post("/login", account.login);
router.get("/cek", auth, logStatus.cekStatus);

module.exports = router;
