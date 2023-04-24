const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.mongoDbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection is Successfull");
  })
  .catch(() => {
    console.log("Connection is Terminated");
  });

module.exports = mongoose;
