const handleError = (err) => {
  const clientError = { email: "", password: "" };
  // this error object is to be sent to the frontend
  // the email peoperty gets populated if an error occurs in the email fields and same for password

  // input parameter "err" is an object which contains 2 properties - email and password
  // if there's no error in any of these 2 fields it won't be present in the "err" object

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((item) => {
      clientError[item.properties.path] = item.properties.message;
    });
  }

  // errors due to duplicate
  if (err.code == 11000) {
    clientError.email = "This email has already been taken";
  }

  return clientError;
};

module.exports = {
  handleError,
};
