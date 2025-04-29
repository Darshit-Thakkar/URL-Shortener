const express = require("express");
const app = express();
const URL = require("./models/url");
const post = 3001;
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connection");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
});

app.listen(post, () =>
  console.log(`server started at http://localhost:${post}`)
);
