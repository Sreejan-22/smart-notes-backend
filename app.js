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

// middleware
app.use(express.json()); // takes any json data that comes along with the request and parses the data into javascript objects so that we can access from the request body itself

// app.use(express.urlencoded());
// app.use(cookieParser());
app.use(cors());

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`App listening on port ${process.env.PORT}`);
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
