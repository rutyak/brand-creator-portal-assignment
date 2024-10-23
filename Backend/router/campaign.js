
const express = require("express");
const fetchController = require("../controller/fetchController");
const createController = require("../controller/createController");
const Campaign = require("../model/CampaignSchema");
const updateController = require("../controller/updateController");
const uploadImageController = require("../controller/uploadImageController")
const router = express.Router();
const multer = require('multer');
const upload = require('../storage/multer');
const uploadContentController = require("../controller/uploadImageController");
const uploadVideoController = require("../controller/uploadVideoController");


router.post("/create/campaign", createController(Campaign));

router.get("/fetch/campaign", fetchController(Campaign))

router.patch("/update/campaign/:id", updateController(Campaign, "patch"));

router.put("/allupdate/campaign/:id", updateController(Campaign, "put"));

router.patch("/update/campaign/content/single/:id", upload.single("files"), uploadVideoController(Campaign, "patch"));

router.patch("/update/campaign/content/multi/:id", upload.array("files"), uploadImageController(Campaign, "patch"));

module.exports = router; 