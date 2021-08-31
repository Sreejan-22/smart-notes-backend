require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.router");
const notesRoutes = require("./routes/notes.router");
const cors = require("cors");

/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
*/
const app = express();
const port = 3000;

// middleware
app.use(express.json()); // takes any json data that comes along with the request and parses the data into javascript objects so that we can access from the request body itself

// app.use(express.urlencoded());
// app.use(cookieParser());
app.use(cors());
// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*"); // "*" means all origins; while in production put here the url of the frontend of the web app
//   // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   // res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.set("Access-Control-Allow-Origin", "*");
//   next();
// });

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

// routes
app.use(authRoutes);
app.use(notesRoutes);
// 404
app.use("/", (req, res) => {
  res.status(404).json({ status: "error", message: "404 page!! Not found!!" });
});
