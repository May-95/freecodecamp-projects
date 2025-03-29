require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dns = require("dns").promises;
mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
  _id: Number,
  original: { type: String, required: true },
});

const url = mongoose.model("URL", urlSchema);
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", async (req, res) => {
  const originalUrl = new URL(req.body["url"]);
  const validUrl = await dnsLookup(originalUrl.hostname);
  if (!validUrl) res.json({ error: "invalid url" });
  const id = Math.floor(Math.random() * 100000000);
  try {
    const result = await saveUrl(id, originalUrl);
    if (result instanceof Error) return res.json({ error: result.message });
    return res.json({ original_url: originalUrl.href, short_url: result._id });
  } catch (error) {
    res.json({ error: error.message });
    return;
  }
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  const short_url = req.params["short_url"];
  try {
    const result = await url.findOne({ _id: short_url });
    if (!result) return res.json({ error: "Short URL not found" });
    if (result instanceof Error) return res.json({ error: result.message });
    return res.redirect(result.original);
  } catch (error) {
    return res.json({ error: "Error getting original URL, try again later!" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const saveUrl = async (id, originalUrl) => {
  try {
    const savedUrl = await url.create({ _id: id, original: originalUrl });
    return savedUrl;
  } catch (err) {
    console.error("Error saving URL: ", err.message);
    throw new Error("Error trying to save the URL. Please try again later.");
  }
};

const dnsLookup = async (hostname) => {
  try {
    await dns.lookup(hostname);
    return true;
  } catch (err) {
    console.error(`DNS lookup failed for ${hostname}: ${err.message}`);
    return false;
  }
};
