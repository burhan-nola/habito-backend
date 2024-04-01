const express = require("express");
const logStatus = require("./controllers/logStatus.js");
const lightStatus = require("./controllers/lightStatus.js");
const account = require("./controllers/account.js");
const auth = require("./middleware.js");

const router = express.Router();

router.get("/data", logStatus.try);
router.post("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.post("/register", logStatus.register);
router.post("/keep-online", logStatus.alwaysOnline);
router.get("/clear-logs", logStatus.clearLogs);

//light status
router.get("/light", lightStatus.light);
router.post("/light-status", lightStatus.getLight);
router.get("/filter-light", lightStatus.filterLight);
router.get("/detail-task", lightStatus.detailTask);
router.post("/edit-task", lightStatus.editTask);

//web
router.post("/login", account.login);
router.get("/cek", auth, logStatus.cekStatus);
router.get("/user", account.getUser);
router.patch("/user", account.editData);

module.exports = router;
