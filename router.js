const express = require("express");
const logStatus = require("./controllers/logStatus.js");

const router = express.Router();

router.get("/try", logStatus.try);
router.get("/logs", logStatus.logs);
router.get("/offline", logStatus.offline);
router.get("/register", logStatus.register);
router.get("/cek", logStatus.cekStatus);
router.get("/keep-online", logStatus.alwaysOnline);

module.exports = router;
