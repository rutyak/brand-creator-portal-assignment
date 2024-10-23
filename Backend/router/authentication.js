const express = require("express");
const userCreateController = require("../controller/userCreateController");
const userAuthController = require("../controller/userAuthController");
const router = express.Router();

router.post("/signup", userCreateController);

router.post("/login", userAuthController);

module.exports = router; 