const express = require("express");
const logStatus = require("./controllers/logStatus.js");
const lightStatus = require("./controllers/lightStatus.js");
const account = require("./controllers/account.js");
const auth = require("./middleware.js");

const router = express.Router();

router.post("/try", logStatus.try);
router.post("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.post("/register", logStatus.register);
router.post("/keep-online", logStatus.alwaysOnline);

//light status
router.get("/light", lightStatus.light);
router.get("/light-status", lightStatus.getLight);
router.get("/filter-light", lightStatus.filterLight);

//web
router.post("/login", account.login);
router.get("/cek", auth, logStatus.cekStatus);
router.get("/user", account.getUser);

module.exports = router;
