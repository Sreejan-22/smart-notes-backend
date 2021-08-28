function validatePassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g.test(
    value
  );
}

module.exports = {
  validatePassword,
};
