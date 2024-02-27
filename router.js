const express = require("express");
const middleware = require("./middleware.js");
const controller = require("./controller.js");

const router = express.Router();

router.get("/try", controller.try);
router.get("/logs", controller.logs);
router.get("/offline", controller.offline);
router.get("/register", controller.register);
router.get("/cek", controller.cekStatus);
router.get("/keep-online", middleware, controller.alwaysOnline);

module.exports = router;
