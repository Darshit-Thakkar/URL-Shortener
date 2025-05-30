const express = require("express");
const {
  handleGenerateNewShortURL,
  handleAnalytics,
  handleUpdate,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/:shortId",handleUpdate);

module.exports = router;
