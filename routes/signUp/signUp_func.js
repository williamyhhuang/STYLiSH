/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const crypto = require('crypto');

// 檢查email格式
function checkEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = re.test(email);
  return result;
}

// 檢查email格式
const checkEmailFormat = (email) => {
  let message;
  return new Promise((resolve, reject) => {
    const checkEmailFormatResult = checkEmail(email);
    if (checkEmailFormatResult === false) {
      message = 'the email format is wrong';
      reject(message);
    } else {
      resolve(true);
    }
  });
};

// 產生隨機亂數
function getRandom(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// 產生一個不重複的亂數ID
function getRandomID(minNum, maxNum, idArray) {
  let id;
  do {
    var exist = true;
    id = getRandom(minNum, maxNum);
    if (idArray.indexOf(id) < 0) {
      exist = false;
    }
  } while (exist);
  return id;
}

// 給token
function createToken(email) {
  const hashEmail = crypto.createHash('sha1');
  hashEmail.update(email);
  const token = hashEmail.digest('hex');
  return token;
}

module.exports = {
  checkEmailFormat,
  getRandomID,
  createToken,
};
