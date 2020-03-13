/* eslint-disable max-len */
const database = require('../../scripts/mysql');
const db = database.db;

// 檢查email有沒有重複
const checkEmailExsist = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT email FROM signup WHERE email = '${email}' `, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length >= 1) {
        message = 'the email has been used';
        reject(message);
      } else {
        resolve(true);
      }
    });
  });
};

const getSignUpData = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM signup', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertSignUpData = (id, token, delayTime, name, password, email) => {
  return new Promise((resolve, reject) => {
    const date = Date.now();
    const sqlSignUp = `INSERT INTO signup SET ?`;
    const postSignUp = {
      id: id,
      access_token: token,
      access_expired: delayTime,
      delayTime: Number(date + delayTime),
      provider: 'native',
      name: name,
      password: password,
      email: email,
      picture: null,
    };
    db.query(sqlSignUp, postSignUp, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
        console.log('會員註冊結果', result);
      }
    });
  });
};

module.exports = {
  checkEmailExsist,
  getSignUpData,
  insertSignUpData,
};
