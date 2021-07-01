const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(/^\/$/, (req, res) => {
  res.send("Moderation Service");
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4000/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }

  res.json({});
});

app.listen(4004, () => {
  console.log("Moderation Service running at 4004");
});
