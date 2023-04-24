const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const task = require("./routes/task");
const PORT = process.env.PORT || 5000;
require("./db/connection");
app.use(express.json());
app.use(task);
app.listen(PORT, () => {
  console.log(`The Server is Up and Running on Port ${PORT}`);
});
