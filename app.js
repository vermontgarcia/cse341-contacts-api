require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongodb = require("./database/connect");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors);

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`App is listening running on port ${port}`);
    });
  }
});
