const express = require("express");
const router = express.Router();

const ApiController = require("../controllers/api");

router.post("/", ApiController.add);

module.exports = router;
