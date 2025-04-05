require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const exerciseSchema = new mongoose.Schema({
  userId: { type: String },
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: Date,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

const user = mongoose.model("User", userSchema);
const exercise = mongoose.model("Exercise", exerciseSchema);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app
  .get("/api/users", async (req, res) => {
    const result = await user.find();
    return res.json(result);
  })
  .post("/api/users", async (req, res) => {
    if (req.body.username.length == 0)
      return res.json({ error: "A username is required." });
    const newUser = await new user({ username: req.body.username });
    newUser.save();
    return res.json({ username: newUser.username, _id: newUser.id });
  });

app.post("/api/users/:_id/exercises", async (req, res) => {
  if (!req.body.duration || !req.body.description)
    return res.json({ error: "Description and duration are required fields." });
  try {
    const userData = await getUserInfo(req.params._id);
    if (!userData)
      return res.json({ error: "Error getting user details. Try again." });
    return res.json(await saveExercise(userData, req.body));
  } catch (error) {
    return res.json({ error: "An error has occurred. Try again." });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  try {
    const result = await getUserInfo(req.params._id);
    const exercises = await getExercise(req.params._id, req.query);
    const logs = await formatLogs(exercises);
    const data = {
      _id: result._id.toString(),
      username: result.username,
      count: Number(logs.length),
      log: logs,
    };
    return res.json(data);
  } catch (error) {
    res.json({ error: "Error has occured." });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const getUserInfo = async (id) => {
  return user.findById(id);
};

const saveExercise = async (userData, req) => {
  const date = invalidDate(req.date) ? new Date() : new Date(req.date);

  const newExercise = await new exercise({
    userId: userData._id,
    username: userData.username,
    description: req.description,
    duration: Number(req.duration),
    date: date,
  });

  newExercise.save();

  return {
    _id: userData._id.toString(),
    username: userData.username,
    description: req.description,
    duration: Number(req.duration),
    date: date.toDateString(),
  };
};

const getExercise = async (id, query) => {
  if (Object.keys(query).length === 0) return exercise.find({ userId: id });
  const { to, from, limit } = query;
  const filter = { userId: id };

  if (!invalidDate(to) || !invalidDate(from)) {
    filter.date = {};
    if (!invalidDate(to)) filter.date["$lte"] = new Date(to);
    if (!invalidDate(from)) filter.date["$gte"] = new Date(from);
  }

  const queryResult = exercise.find(filter).sort({ date: -1 });
  return limit ? queryResult.limit(limit) : queryResult;
};

const invalidDate = (date) => {
  return isNaN(new Date(date).getTime());
};

const formatLogs = async (logs) => {
  return logs.map((e) => {
    return {
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString(),
    };
  });
};
