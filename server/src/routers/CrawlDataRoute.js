const express = require("express");
const CrawlDataController = require("../controller/CrawlDataController");
const router = express.Router();

router.get("/test", CrawlDataController.test);
router.get("/:id", CrawlDataController.getData);
router.post("/:id/week", CrawlDataController.postDataByWeek);
router.post("/:id/day", CrawlDataController.postDataByDay);
router.get("/name/:id", CrawlDataController.getName);

module.exports = router;
