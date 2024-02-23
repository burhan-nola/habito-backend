const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/try", controller.try);
router.post("/post", controller.postData);
router.post("/newpost/:param1", controller.newPost);

module.exports = router;
