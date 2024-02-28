const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/try", controller.try);
router.get("/logs", controller.logs);
router.get("/offline", controller.offline);
router.get("/register", controller.register);
router.get("/cek", controller.cekStatus);
router.get("/keep-online", controller.alwaysOnline);

module.exports = router;
