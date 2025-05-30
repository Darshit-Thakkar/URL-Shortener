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
  return res.render("home", { id: shortID });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId });
  return res.json({
    totalclicks: result.visitHistory.length,
    analyics: result.visitHistory,
  });
}
async function handleUpdate(req, res) {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleAnalytics,
  handleUpdate,
};
