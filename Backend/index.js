const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userAuthRouter = require("./router/authentication");
const campaignRouter = require("./router/campaign");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.MongoDB_url;

app.use(cors());
app.use(express.json());

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection established...");
  })
  .catch((error) => {
    console.error("Error in connection...", error);
  });

app.use(campaignRouter);
app.use(userAuthRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
