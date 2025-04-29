const shortid = require("shortid");
const url = require("../models/url.js");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid();
  await url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId });
  return res.json({
    totalclicks: result.visitHistory.length,
    analyics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleAnalytics
};
