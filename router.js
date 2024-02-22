const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/try", controller.try);
router.post("/login", controller.login);

module.exports = router;
