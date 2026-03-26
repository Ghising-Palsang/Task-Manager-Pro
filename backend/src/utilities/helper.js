const fs = require("fs");

const generateRandomString = (len = 100) => {
  let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let randomString = "";

  for (let i = 0; i < len; i++) {
    let posn = Math.floor(Math.random() * string.length);
    randomString += string[posn];
  }

  return randomString;
};

// let secret = crypto.randomBytes(32).toString('hex');

const fileDelete = (filePath) => {
  if (fs.existsSync(filePath)) {
    return fs.unlinkSync(filePath);
  }
  return false;
};

module.exports = { generateRandomString , fileDelete};
