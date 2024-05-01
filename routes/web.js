const express = require("express");
const router = express.Router();
const webController = require("../controllers/WebController");

router.get("/", webController.index);

module.exports = router;
