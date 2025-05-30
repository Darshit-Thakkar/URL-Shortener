const { connectToMongoDB } = require("./connection");
const express = require("express");
const app = express();
const URL = require("./models/url");
const post = 3001;
const path = require("path");

// routers 
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(post, () =>
  console.log(`server started at http://localhost:${post}`)
);
