const express = require("express");
const url = require("../models/url.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await url.find({});
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
