const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/items", itemsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Что-то сломалось!");
});

module.exports = app;
