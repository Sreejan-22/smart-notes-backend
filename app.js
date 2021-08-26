require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser"); // this package makes working with cookies in nodejs easier

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
app.use(cookieParser());

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

app.use(authRoutes);

// // cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-cookie", "newUser=true");
//   // when we send this response, this cookie will get registered in the browser

//   // we can access a cookie method on the response object after invoking cookieParser
//   res.cookie("newUser", true); // this is the same thing as => res.setHeader("Set-cookie", "newUser=true");
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24, // expiry time -> 24 hours
//     httpOnly: true, // attribute to prevent access to cookie values via JavaScript using document.cookie;  helps mitigate cross-site scripting (XSS) attacks.
//     // secure: true, // A cookie with the Secure attribute is sent to the server only with an encrypted request over the HTTPS protocol, never with unsecured HTTP (except on localhost)
//   });
//   res.send("you got the cookies");
// });

// app.get("/get-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);

//   res.json(cookies);
// });
