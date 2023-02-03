const express = require("express");
const CrawlDataController = require("../controller/CrawlDataController");
const router = express.Router();

router.post("/all", CrawlDataController.getData);
router.post("/week", CrawlDataController.postDataByWeek);
router.post("/day", CrawlDataController.postDataByDay);
router.post("/name", CrawlDataController.getName);

module.exports = router;
