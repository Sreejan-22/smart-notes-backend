const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
*/
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded());

const dbName = "smart-notes";
const dbURI = `mongodb+srv://smartAdmin:${process.env.MONGODB_PASSWORD}@cluster0.ozfi3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
