const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const hashPassword = bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = securePassword;
